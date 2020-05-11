import React, { useEffect, useState } from "react";

const CompilerOutput = (props) => {
  var [state, setState] = useState({
    code: props.codeValue,
    language: props.language
  });

  useEffect(() => {
    setState({
      code: props.codeValue,
      language: props.language
    });
  }, [props.codeValue, props.language]);

  return (
    <div>
        <div style={{position: "fixed", top: 0, width: "100%", backgroundColor: "#272822", paddingBottom: "10px"}}>
          <button
            className={"runButton"}
            // onClick={() => props.sendCompile()}
          >
            Run
          </button>

          <select
            onChange={e => props.setLanguage(e.currentTarget.value, props.roomID, props.name)}
            value={state.language}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div style={{paddingTop: "38px"}}>
          {props.log.map((item, index) => (
            <div key={index}><pre key={index} className={(item.type === "normal") ? "textColor codeRunResults" : "textColor codeRunResults codeRunError"}>{item.message}</pre><hr/></div>
          ))}
        </div>
    </div>
  );
}

export default CompilerOutput;
