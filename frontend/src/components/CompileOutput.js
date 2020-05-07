import React from "react";

function CompilerOutput() {
  return (
    <div>
        <button className={"runButton"}>Run</button>

    {[1,2,3].map((_) => <div><pre key={_} className={"codeRunResults"}>{`Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'formatting' is not defined`}</pre><hr/></div>)}
    </div>
  );
}

export default CompilerOutput;
