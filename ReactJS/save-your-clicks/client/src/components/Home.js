import React, { Component } from 'react'
import history from '../history';

class Home extends Component {
	
	login() {
    	this.props.auth.login();
  	}

 	logout() {
   		this.props.auth.logout();
  	}

	render() {
		if (history.location.state) {
			if(history.location.state.isLoggedIn)
				console.log("State : " + history.location.state.isLoggedIn);
			else {
				console.log("State :( : " + false);
				this.login();
			}
		}

  		return(
  			<div>
    			<p>Home-Seite</p>
  			</div>
  		);
	}
}

export default Home