import React, { Component } from 'react';
import DragCard from './DragCard.js';

class Home extends Component {
	
	componentDidMount() {
		const id = this.props.auth.getProfile((err, profile) => {
			const userid = profile.sub;

			fetch("/api/getComponents?userid=" + userid)
				.then((response) => response.json())
				.then((data) => this.handleComponents(data));
		})

		
	}

	handleComponents(data) {
		console.log(data);
	}

	render() {


  		return(
  			<div>
    			<p>Home-Seite</p>
    			<DragCard grid={[25, 25]} bounds="body"/>
  			</div>
  		);
	}
}

export default Home