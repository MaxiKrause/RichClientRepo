import React, { Component } from 'react'
import Header from './Header'
import history from '../history.js'

class App extends Component {
	constructor(props) {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.auth.logout();
  }

	render() {
		const { isAuthenticated } = this.props.auth;
    if (history.location.pathname === '/' && !isAuthenticated()) {
      history.replace('/login');
    }
    if (isAuthenticated()) {
      this.props.auth.getProfile(() => {});
    }
  		return(
  			<div>
  				<Header auth={this.props.auth}/>
    			<p>Hallo</p>
          <p>{history.location.pathname}</p>
    			{
    				isAuthenticated() && (
    					<p>LOGGED IN</p>
    				)
    			}
  			</div>

  		);
	}
}

export default App