import React, { Component } from 'react';
import DragCard from './DragCard.js';

class Home extends Component {
	
	render() {


  		return(
  			<div>
    			<p>Home-Seite</p>
    			<DragCard userProfile={this.props.auth.userProfile} grid={[25, 25]} bounds="body"/>
  			</div>
  		);
	}
}

export default Home