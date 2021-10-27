import { basicSetup } from "@codemirror/basic-setup";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import {StreamLanguage} from "@codemirror/stream-parser";
import { oCaml } from "@codemirror/legacy-modes/mode/mllike"
import { oneDark } from "@codemirror/theme-one-dark";
import {useEffect, useRef} from "react";
import styles from "./CodePage.module.css";
import baseStyles from '../../components/Styling.module.css';
import axios from "axios";

export default function CodePage() {
  const tableName = "JobStatuses";
  const dispatchURL = "https://sp7a90z6s7.execute-api.us-east-1.amazonaws.com/beta/dispatchjob";
  const editor = useRef();

  function sendJob(code){
    axios({
      method : "POST",
      url: dispatchURL,
      data:{
        code: code
      },
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.data;
    }, (error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const state = EditorState.create({
      doc: "(** Your code goes here *)",
      extensions: [basicSetup, StreamLanguage.define(oCaml), oneDark]
    });

    const view = new EditorView({ state, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={baseStyles.header}>Code Editor</h1>
      <div className={styles.editorWrapper}>
        <div ref={editor} />
      </div>
      <div className={styles.executeWrapper}>
        <button
          className={baseStyles.btn}
          onClick={() => {console.log(editor.getValue())}}
        >
          Execute Code
        </button>
      </div>
    </div>
  );
}