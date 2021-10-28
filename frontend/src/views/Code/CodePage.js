import { basicSetup } from "@codemirror/basic-setup";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import {StreamLanguage} from "@codemirror/stream-parser";
import { oCaml } from "@codemirror/legacy-modes/mode/mllike"
import { oneDark } from "@codemirror/theme-one-dark";
import {useEffect, useRef, useState} from "react";
import styles from "./CodePage.module.css";
import baseStyles from '../../components/Styling.module.css';
import axios from "axios";
import DisplayBox from "../../components/Forms/DisplayBox/DisplayBox";

export default function CodePage() {
  const [editor, setEditor] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [previousWork, setPreviousWork] = useState(false);
  const [loadState, setLoadState] = useState(0);
  const [jobResult, setJobResult] = useState("N/A");

  const editorRef = useRef();

  function sendJob() {
    axios({
      method : "POST",
      url: "https://p65v01zgya.execute-api.us-east-1.amazonaws.com/prod/dispatchjob",
      data: {
        code: editor.contentDOM.innerText
      },
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      let newJobId = response.data['jobID'];
      setJobId(newJobId);
      localStorage.setItem('synduce-jobId', newJobId);
      localStorage.setItem('synduce-code', editor.contentDOM.innerText);
    }, (error) => {
      console.log(error);
    });
  }

  function queryJob() {
    if (jobId !== null) {
      axios({
        method : "POST",
        url: "https://p65v01zgya.execute-api.us-east-1.amazonaws.com/prod/queryjob",
        data: {
          jobID: jobId
        },
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        let row = response.data.row;
        if (row.status.S === "FINISHED") {
          setJobResult(row.logs.S);
          setLoadState(2);
        } else if (row.status.S === "RUNNING") {
          setLoadState(1);
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    const state = EditorState.create({
      doc: "(** Your code goes here *)",
      extensions: [basicSetup, StreamLanguage.define(oCaml), oneDark]
    });

    let view = new EditorView({ state, parent: editorRef.current });
    setEditor(view);
    setJobId(localStorage.getItem("synduce-jobId"));

    // Load previous code
    let code = localStorage.getItem('synduce-code');
    if (code) {
      view.contentDOM.innerText = code;
      setPreviousWork(true);
    }

    // // @todo might wanna destroy on page leave
    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    queryJob();
  }, [jobId]);

  return (
    <div className={styles.main}>
      <h1 className={baseStyles.header}>Code Editor</h1>
      <div className={styles.editorWrapper}>
        {loadState === 1 && <DisplayBox
          bgColor="#90caf9"
          borderColor="#90caf9"
          color="#000"
          h="auto"
          text="Your code is currently processing, this could take up to 15 minutes."
          style={{ alignSelf: "center", marginBottom: "20px" }}
        />}
        <div ref={editorRef} />
      </div>
      <div className={styles.executeWrapper}>
        {previousWork && <p className={styles.loadedPrevious}>Auto-loaded code your from previous session</p>}
        <button
          className={baseStyles.btn}
          onClick={sendJob}
        >
          Execute Code
        </button>
        <br />
        <button
          className={`${baseStyles.btn} ${styles.requestUpdateButton}`}
          onClick={queryJob}
        >
          Request job update
        </button>
      </div>
      {loadState === 2 && <div className={styles.responseWrapper}>
        <h2>Job response</h2>
        <p>{jobResult}</p>
      </div>}
    </div>
  );
}