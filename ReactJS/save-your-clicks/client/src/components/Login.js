import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class Login extends Component {
	login() {
    	this.props.auth.login();
  	}

  	logout() {
    	this.props.auth.logout();
  	}

  	render() {
  		const { isAuthenticated } = this.props.auth;
  		this.login();
  		return(null);
  	}
}

export default Login