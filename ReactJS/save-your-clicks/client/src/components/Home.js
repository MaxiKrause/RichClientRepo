import React, { Component } from 'react';
import DragCard from './DragCard.js';
import LeafletMap from './LeafletMap.js';
import NewsCard from './NewsCard.js';
import YTCard from  './YTCard.js';
import TwitchCard from  './TwitchCard.js';
import {generateElement} from 'react-live';
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';


class Home extends Component {
	 constructor(props) {
    super(props);
    this.state = {
      components: [],
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
    if (!data) return;
    let list = [];
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
    			<DragCard auth={this.props.auth} grid={[25, 25]} bounds="body"/>
    			<LeafletMap auth={this.props.auth} grid={[25, 25]} bounds="body"/>
          <NewsCard auth={this.props.auth} grid={[25, 25]} bounds="body"/>
          <YTCard auth={this.props.auth} grid={[25, 25]} bounds="body"/>
          <TwitchCard auth={this.props.auth} grid={[25, 25]} bounds="body"/>
          {this.state.components.map((Components) => <Components />)}
  			</div>
  		);
	}
}

export default Home