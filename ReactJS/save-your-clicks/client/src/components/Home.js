import React, { Component } from 'react';
import DragCard from './DragCard.js';
import NewsCard from './NewsCard.js';
import YTCard from './YTCard.js';
import {generateElement} from 'react-live';
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';

class Home extends Component {
	constructor(props) {
		super(props);
		let list = [];
		list.push(generateElement({code: "<div>hallo</div>"}));
		this.state = {
			components: list,
			loaded: false
		};
	}

	componentDidMount() {
		const id = this.props.auth.getProfile((err, profile) => {
			const userid = profile.sub;

			fetch("/api/getComponents?userid=" + userid)
				.then((response) => response.json())
				.then((data) => this.handleComponents(data));
		})

	}

	handleComponents(data) {
		let list = [];
		console.log(data[0].component);
		for (var i = data.length - 1; i >= 0; i--) {
			list.push(Element = generateElement({code: data[i].component, scope:{Draggable, Card}}));
		}
		this.setState({
			components : list,
		});
	}

	render() {
  		return(
  			<div>
    			<p>Home-Seite</p>
    			<DragCard grid={[25, 25]} bounds="body"/>
    			<NewsCard grid={[25, 25]} bounds="body"/>
    			<YTCard grid={[25, 25]} bounds="body"/>
    			{this.state.components.map((Components) => <Components />)}
  			</div>

  		);
	}
}

export default Home