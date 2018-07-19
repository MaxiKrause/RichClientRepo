import React, { Component } from 'react';
import DragCard from './DragCard.js';
import NewsCard from './NewsCard.js';
import YTCard from './YTCard.js';
import TwitchCard from './TwitchCard.js';

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

	}

	render() {


  		return(
  			<div>
    			<p>Home-Seite</p>
    			<DragCard grid={[25, 25]} bounds="body"/>
    			<NewsCard grid={[25, 25]} bounds="body"/>
    			<YTCard grid={[25, 25]} bounds="body"/>
    			<TwitchCard grid={[25, 25]} bounds="body"/>
  			</div>
  		);
	}
}

export default Home