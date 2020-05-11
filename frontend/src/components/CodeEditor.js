import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-settings_menu";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = (props) => {
  var [state, setState] = useState({
    code: props.codeValue,
    language: props.language
  });

  // useEffect(() => {
  //   setState({
  //     code: props.codeValue,
  //     language: props.language
  //   });
  //   console.log("CodeEditor");
  //   console.log(state);
  // }, [state, props.codeValue, props.language]);

  return (
    <div>
      <AceEditor
        width="100%"
        height="97vh"
        mode={state.language}
        theme="monokai"
        name="editor"
        fontSize={14}
        wrapEnabled={true}
        value={state.code}
        onChange={(value) => props.handleCodeChange(value, props.roomID)}
        commands={[{
          name: "save",
          bindKey: {win: "Ctrl-S", mac: "Command-S"},
          exec: () => {}
        }]}
      />
    </div>
  );
}

export default CodeEditor;
