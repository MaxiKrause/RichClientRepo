import React, { Component } from 'react';
import DragCard from './DragCard.js';
import LeafletMap from './LeafletMap.js';


class Home extends Component {
	
	render() {

  		return(
  			<div>
    			<p>Home-Seite</p>
    			<DragCard auth={this.props.auth} grid={[25, 25]} bounds="body"/>
    			<LeafletMap auth={this.props.auth} grid={[25, 25]} bounds="body"/>
  			</div>
  		);
	}
}

export default Home