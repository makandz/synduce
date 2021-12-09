import { basicSetup } from "@codemirror/basic-setup";
import { oCaml } from "@codemirror/legacy-modes/mode/mllike";
import { EditorState } from "@codemirror/state";
import { StreamLanguage } from "@codemirror/stream-parser";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DisplayBox from "../../components/Forms/DisplayBox/DisplayBox";
import baseStyles from '../../components/Styling.module.css';
import styles from "./CodePage.module.css";
import { useAuth } from "../../libs/hooks/Auth";

export default function CodePage(props) {
  const [editor, setEditor] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [previousWork, setPreviousWork] = useState(false);
  const [loadState, setLoadState] = useState(0);
  const [jobResult, setJobResult] = useState("N/A");
  const [polling, setPolling] = useState(null);

  const editorRef = useRef();
  const auth = useAuth();

  function sendJob() {
    axios({
      method : "POST",
      url: "https://rhnq76qo4e.execute-api.us-east-1.amazonaws.com/active/dispatchjob",
      data: {
        userID: auth?.user?.uid || "guest",
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
        url: "https://rhnq76qo4e.execute-api.us-east-1.amazonaws.com/active/queryjob",
        data: {
          userID: auth?.user?.uid || "guest",
          jobID: jobId,
        },
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        let row = response.data.row;
        if (row?.status?.S === "FINISHED") {
          setJobResult(row.logs.S);
          setLoadState(2);
          if (polling) clearInterval(polling);
        } else if (row?.status?.S === "RUNNING") {
          setLoadState(1);
          if (!polling) {
            setPolling(
              setInterval(() => {
                queryJob();
                console.log("requesting job update");
              }, 5000)
            );
          }
        } else {
          setLoadState(0);
          if (polling) clearInterval(polling);
        }
      }, (error) => {
        console.log(error);
        setLoadState(0);
        if (polling) clearInterval(polling);
      });
    }
  }

  useEffect(() => {
    const state = EditorState.create({
      doc: "(** Your code goes here *)",
      extensions: [basicSetup, StreamLanguage.define(oCaml), oneDark]
    });

    let view = new EditorView({ state, parent: editorRef.current });
    setJobId(localStorage.getItem("synduce-jobId"));
    setEditor(view);
    
    // Load previous code
    let code = localStorage.getItem('synduce-code');
    if (props.match.params.token) {

    } else if (code) {
      view.contentDOM.innerText = code.replace(/\n\n/g, "\n");
      setPreviousWork(true);
    }

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
        {previousWork && <p className={styles.loadedPrevious}>
          Code loaded from a previous local session
        </p>}
        {props.match.params.token && <p className={styles.loadedPrevious}>
          Code and response loaded from a previous online session
        </p>}
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
        <div className={`${styles.statusBox} ${styles.error}`}>
          <p>Job completed successfully</p>
          <p>Algorithm: SE2GIS</p>
          <p>Time elapsed: 0.409 seconds</p>
        </div>

        <h2>Your result</h2>
        <div className={styles.codebox}>
          {jobResult}
        </div>
      </div>}
    </div>
  );
}