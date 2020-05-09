import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as challengesActions from '../actions/challengesActions';
import ChallengesList from './ChallengesList';

function HomePage(){
    useEffect(() => {
        if (this.props.challenges.length == 0) {
          this.props.actions.getChallenges();
        }
    });
 
}
export default HomePage;


function mapStateToProps(state) {
  return {challenges: state.challenges}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(challengesActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);