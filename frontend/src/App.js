import React from 'react';
import "./style.css"
import CompileOutput from "./components/CompileOutput";
import CodeEditor from "./components/CodeEditor";
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <div className={"container"}>
      <div className={"leftSide"}>
        <CompileOutput />
      </div>

      <div className={"rightSide"}>
        <CodeEditor />
      </div>

      <div className={"bottom"}>
        <BottomBar />
      </div>
    </div>
  );
}

export default App;
