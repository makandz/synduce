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
  const auth = useAuth();

  const [editor, setEditor] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [previousWork, setPreviousWork] = useState(false);
  const [loadState, setLoadState] = useState(0);
  const [jobResult, setJobResult] = useState("N/A");
  const [options] = useState([
    {
      type: "range",
      code: "-n",
      value: 124,
      options: { min: 1, max: 1024 },
      description: "unfolding limit in intermediate verification steps"
    }, {
      type: "flag",
      code: "-N",
      value: true,
      description: "allow bounded check for classifying counterexamples"
    }, {
      type: "flag",
      code: "-B",
      value: false,
      description: "allow bounded check to verify lemmas"
    }, {
      type: "flag",
      code: "--no-lifting",
      value: false,
      description: "disallow lifting"
    }, {
      type: "flag",
      code: "--no-gropt",
      value: false,
      description: "disallow grammar optimizations"
    }]
  )

  const editorRef = useRef();

  function sendJob() {
    console.log(options)
    axios({
      method : "POST",
      url: "https://rhnq76qo4e.execute-api.us-east-1.amazonaws.com/active/dispatchjob",
      data: {
        userID: auth?.user?.uid || "guest",
        code: editor.contentDOM.innerText,
        options: {
          flags: parseOptions(options, 'flag'),
          numerics: parseOptions(options, 'range')
        }
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

  const parseOptions = (opts, type) => {
    let final = {};
    opts.forEach((e) => {
      if (e.type === type)
        final[e.code] = e.value
    });

    return final;
  }

  function queryJob() {
    if (jobId !== null) {
      axios({
        method : "POST",
        url: "https://rhnq76qo4e.execute-api.us-east-1.amazonaws.com/active/queryjob",
        data: {
          userID: auth?.user?.uid || "guest",
          jobID: jobId
        },
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        let row = response.data.row;

        if (row?.status?.S === "FINISHED") {
          try {
            setJobResult({ success: true, data: JSON.parse(row.logs.S)});
          } catch (e) {
            setJobResult({ success: false, data: row.logs.S});
          }

          setLoadState(2);
        } else if (row === {} || row?.status?.S === "RUNNING") {
          setLoadState(1);
          setTimeout(() => {
            queryJob();
            console.log("requesting job update");
          }, 5000);
        } else {
          setLoadState(0);
        }
      }, (error) => {
        console.log(error);
        setLoadState(0);
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
    
    // Load previous code
    let code = localStorage.getItem('synduce-code');
    if (props.match.params.token === 'pastjob') {
      const code = localStorage.getItem("synduce-pastJobCode");
      if (code)
        view.contentDOM.innerText = code.replace(/\n\n/g, "\n");
      // sendJob(); // query for loading a job
    } else if (code) {
      view.contentDOM.innerText = code.replace(/\n\n/g, "\n");
      setPreviousWork(true);
    }

    return () => {
      view.destroy();
      // Only load job response if not loading pastjob
      if (props.match.params.token !== 'pastjob')
        setJobId(localStorage.getItem("synduce-jobId"));
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
      <div className={styles.optionsWrapper}>
        <h2>Request options</h2>
        <div className={styles.requestOptions}>
          {options.map(e => (
            (e.type === "flag" && (
              <div>
                <input
                  type="checkbox"
                  defaultChecked={e.value}
                  onChange={(event) => e.value = event.target.checked}
                />
                <label>
                  {e.description.at(0).toUpperCase() + e.description.slice(1)} [{e.code}]
                </label>
              </div>
            )) || (e.type && (
              <div>
                <input
                  type="range"
                  min={e.options.min}
                  max={e.options.max}
                  defaultValue={e.value}
                  onChange={(event) => e.value = event.target.value}
                />
                <label>
                  <strong className={styles.rangeValue}>
                    {e.value}
                  </strong>
                  {e.description.at(0).toUpperCase() + e.description.slice(1)} [{e.code}]
                </label>
              </div>
            ))
          ))}
        </div>
      </div>
      {loadState === 2 && (
        <div className={styles.responseWrapper}>
          <h2>Job response</h2>
            {jobResult.success ? (
              <div className={`${styles.statusBox} ${styles.success}`}>
                <p>Job completed successfully</p>
                <p>Algorithm: {jobResult.data.algorithm}</p>
                <p>Time elapsed: {jobResult.data.total_elapsed.toFixed(2)} seconds</p>
              </div>
            ) : (
              <div className={`${styles.statusBox} ${styles.error}`}>
                <p>Job run failed</p>
                <p>${jobResult.data}</p>
              </div>
            )}

          {jobResult.success && (
            <>
              <h2>Your result</h2>
              <div className={styles.codebox}>
                {jobResult.data.solution.trim()}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}