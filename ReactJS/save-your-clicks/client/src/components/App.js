import React, { Component } from 'react'
import Header from './Header'
import history from '../history.js'

class App extends Component {
	constructor(props) {
		super(props);
		history.replace('/home', {isLoggedIn: false});
		console.log(history.location.state.isLoggedIn);
	}

	render() {
		const { isAuthenticated } = this.props.auth;

  		return(
  			<div>
  				<Header />
    			<p>Hallo</p>
  			
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