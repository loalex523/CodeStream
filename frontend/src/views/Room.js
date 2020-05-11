import React from "react";
import socketIOClient from "socket.io-client";
import CompilerOutput from "../components/CompilerOutput";
import CodeEditor from "../components/CodeEditor";
import BottomBar from "../components/BottomBar";
import "../style.css";

const ENDPOINT = "http://127.0.0.1:8000";
const socket = socketIOClient(ENDPOINT);

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.roomID = props.location.pathname;

    this.name = prompt("Enter your name");
    while (this.name === "" || this.name === undefined) {
      this.name = prompt("Don't be shy, enter your name :)");
    }

    this.componentCleanup = this.componentCleanup.bind(this);;
    this.state = {
      users: [],
      roomID: this.roomID,
      language: "python",
      code: "",
      compileLog: []
    }

    socket.on("welcome", (data) => this.handleWelcome(data));
    socket.on("code update", (data) => this.handleCodeUpdate(data));
    socket.on("user joined", (users) => this.handleUserJoin(users));
    socket.on("user left", (users) => this.handleUserLeft(users));
    socket.on("language changed", (data) => this.handleChangeLanguage(data));
    socket.on("compiling code", (data) => this.handleCompilingCode(data));
    socket.on("compile done", (data) => this.handleCompileDone(data));
  }

  componentCleanup() {
    socket.emit("leave room", {
      name: this.name,
      roomID: this.state.roomID
    });
  }

  componentDidMount() {
    socket.emit("join room", {
      name: this.name,
      language: "python",
      roomID: this.roomID
    });

    window.addEventListener("beforeunload", this.componentCleanup);
  }

  componentWillUnmount() { 
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  handleWelcome(data) {
    data.compileLog = [];
    this.setState(data);
  }

  handleCodeUpdate(data) {
    this.setState(prevState => {
      let code = prevState.code;
      code = data.code;
      return { code };
    });
  }

  handleCodeChange = (data, roomID) => {
    socket.emit("code change", {
      roomID: roomID,
      code: data
    });

    console.log("handleCodeChange");
    console.log(this.state);
  }

  handleUserJoin(data) {
    this.setState(prevState => {
      let users = [...prevState.users];
      users.push(data.user);
      return { users };
    });
  }

  handleUserLeft(data) {
    this.setState(prevState => {
      let users = [...prevState.users];
      users.splice(users.indexOf(name => name === data.user), 1);
      return { users };
    });
  }

  setLanguage = (language, roomID, name) => {
    socket.emit("change language", {
      roomID: roomID,
      name: name,
      language: language
    });

    let compileLog = [...this.state.compileLog];
    compileLog.push({
      message: name + " has changed the language to " + language,
      type: "normal"
    });
    this.setState({
      compileLog: compileLog,
      language: language
    });

    // this.setState({
    //   language: language
    // });

    // this.setState((prevState) => {
    //   let compileLog = [...prevState.compileLog];
    //   compileLog.push({
    //     message: name + " has changed the language to " + language,
    //     type: "normal"
    //   });
    //   return { compileLog };
    // });

    console.log(this.state);
  }

  handleChangeLanguage(data) {
    this.setState((prevState) => {
      let language = prevState.language;
      language = data.newLanguage;
      return { language };
    });

    this.setState((prevState) => {
      let compileLog = [...prevState.compileLog];
      compileLog.push({
        message: data.user + " has changed the language to " + data.newLanguage,
        type: "normal"
      });
      return { compileLog };
    });
  }

  sendCompile = () => {
    console.log("sendCompile fired");

    socket.emit("compile", {
      roomID: this.roomID,
      name: this.name
    });


    this.setState((prevState) => {
      let compileLog = [...prevState.compileLog];
      compileLog.push({
        message: this.name + " has started compiling",
        type: "normal"
      });
      return { compileLog };
    });

    console.log(this.state);
  }

  handleCompilingCode(data) {
    console.log("compiling code fired");
    this.setState((prevState) => {
      let compileLog = [...prevState.compileLog];
      compileLog.push({
        message: data.user + " has started compiling",
        type: "normal"
      });
      return { compileLog };
    });
  }

  handleCompileDone(data) {
    this.setState((prevState) => {
      let compileLog = [...prevState.compileLog];
      compileLog.push({
        message: data.results,
        type: data.status
      });
      return { compileLog };
    });
  }

  render() { 
    return (
      <div className={"container"}>
        <div className={"leftSide"}>
          <CompilerOutput
            codeValue={this.state.code}
            roomID={this.roomID}
            name={this.name}
            language={this.state.language}
            setLanguage={this.setLanguage}
            sendCompile={this.sendCompile}
            log={this.state.compileLog}
          />
        </div>

        <div className={"rightSide"}>
          <CodeEditor
            codeValue={this.state.code}
            handleCodeChange={this.handleCodeChange}
            language={this.state.language}
            roomID={this.state.roomID}
          />
        </div>

        <div className={"bottom"}>
          <BottomBar
            userList={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default Room;