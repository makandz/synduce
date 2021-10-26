import { basicSetup } from "@codemirror/basic-setup";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import {StreamLanguage} from "@codemirror/stream-parser";
import { oCaml } from "@codemirror/legacy-modes/mode/mllike"
import { oneDark } from "@codemirror/theme-one-dark";
import {useEffect, useRef} from "react";
import styles from "./CodePage.module.css";
import baseStyles from '../../components/Styling.module.css';

export default function CodePage() {
  const editor = useRef();

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
    </div>
  );
}