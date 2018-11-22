import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppActions from '../actions/app';

class Login extends Component {
  handleLogin = () => {
    this.props.loginRequest()
  }

  render() {
    return (
      <div>
        <div onClick={this.handleLogin}>
          LOGIN PAGE
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(AppActions.loginRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
