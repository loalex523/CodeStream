import React from 'react';
import "./style.css"
import CompileOutput from "./components/CompileOutput";
import CodeEditor from "./components/CodeEditor";
import BottomBar from "./components/BottomBar";
import TopBar from "./components/TopBar";
import leftSidebar from "./components/leftSidebar";


function App() {
  return (
    <>
    <div className={"screenWindow"}>
    <div className={"leftSidebar"}/>
      <leftSidebar/>
      <TopBar/>
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
    </div>
    </>
  );
}

export default App;
