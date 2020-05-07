import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-settings_menu";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

function CodeEditor() {
  return (
    <div>
      <AceEditor
        width="100%"
        height="97vh"
        mode="python"
        theme="monokai"
        name="editor"
        fontSize={14}
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
