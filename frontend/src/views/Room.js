import React from 'react';
import * as actions from '../actions/challengesActions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AceEditor from "react-ace";
import { AceEditorClass } from 'react-ace/lib/AceEditorClass';
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-settings_menu";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

const io = require('socket.io-client')
const socket = io()


class Room extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {code: ''}
        socket.on('receive code', (payload) => {   
          this.updateCodeFromSockets(payload);
        });
      }
      updateCodeFromSockets(payload) {
        this.setState({code: payload.newCode})
    }
componentDidMount() {
    if (this.props.challenge.id == undefined) {
       this.props.actions.getChallenges();
     } else {
       socket.emit('room', {room: this.props.challenge.id});
     }
   }
  componentWillUnmount() {
    socket.emit('leave room', {
      room: this.props.challenge.id
    })
  }
  componentWillReceiveProps(nextProps) {
    socket.emit('room', {room: nextProps.challenge.id})
  }
  updateCodeInState(newText) {
    this.setState({code: newText})
    socket.emit('coding event', {
    room: this.props.challenge.id,
    newCode: newText
    })   
  }

  render() {
    const options = {
       lineNumbers: true,
       mode: 'python',
       theme: 'monokai'
    }
    return (
      <div>
        <h1>{this.props.challenge.title}</h1>
        <p>{this.props.challenge.description}</p>
        <AceEditor
          value={"hello world!"} 
          onChange={this.updateCodeInState.bind(this)} 
          options={options} />
      </div>
     )
  }
}

  function mapStateToProps(state, ownProps) {
    if (state.challenges.length > 0) {
      const challenge = state.challenges.filter(challenge => 
        {return challenge.id == ownProps.params.id})[0]
      return {challenge: challenge}
    } else {
      return {challenge: {title: '', description: ''}}
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }

export default connect(mapStateToProps, mapDispatchToProps)(Room)
