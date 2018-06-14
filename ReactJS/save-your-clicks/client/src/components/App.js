import React, { Component } from 'react'
import Header from './Header'
import history from '../history.js'

class App extends Component {
	

	render() {
		const { isAuthenticated } = this.props.auth;
    if (history.location.pathname === '/') {
      history.replace('/login');
    }
  		return(
  			<div>
  				<Header />
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