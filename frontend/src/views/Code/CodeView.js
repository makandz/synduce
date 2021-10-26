import { basicSetup } from "@codemirror/basic-setup";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import {StreamLanguage} from "@codemirror/stream-parser";
import { oCaml } from "@codemirror/legacy-modes/mode/mllike"
import {useEffect, useRef} from "react";

export default function CodeView() {
  const editor = useRef();

  useEffect(() => {
    const log = (event) => console.log(event);
    // editor.current.addEventListener("input", log);

    const state = EditorState.create({
      doc: "a ",
      extensions: [basicSetup, StreamLanguage.define(oCaml)]
    });
    const view = new EditorView({ state, parent: editor.current });
    return () => {
      view.destroy();
      // editor.current.removeEventListener("input", log);
    };
  }, []);

  return (
    <>
      <div ref={editor}>sd</div>
    </>
  );
}