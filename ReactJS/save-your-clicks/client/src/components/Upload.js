import React, { Component } from 'react';


class Upload extends Component {
 	render() {
 		const {isAuthenticated} = this.props.auth;
 		return(
 			<div>
 				{
 					!isAuthenticated() && (
 						<p>Bitte anmelden!</p>
 					)
 				}
 				{
 					isAuthenticated() && (
 						<p>Willkommen User!</p>
 					)
 				}

 			</div>
 		);

 	}
}
export default Upload