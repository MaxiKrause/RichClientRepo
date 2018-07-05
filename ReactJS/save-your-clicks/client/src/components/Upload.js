import React, { Component } from 'react';
import './Upload.css';
import Babel from 'babel-standalone';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  generateElement,
  renderElementAsync
} from 'react-live'

class Upload extends Component {

	constructor(props) {
    super(props);
    this.state = {
			content: ""
		};
 	}

 	handleContent(data){
 		this.setState({ content: data});
 	}

 	renderElement() {
 		let code = '<h3>Hello World</h3>';
 		return generateElement({code});
 	}

 	render() {
 		const {isAuthenticated} = this.props.auth;
 		const TEST = this.renderElement();
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

 				<LiveProvider code="<strong>Hello World!</strong>">
			      <LiveEditor className="Editor" onChange={this.handleContent.bind(this)} />
			      <LiveError />
			      <LivePreview className="Preview"/>
			    </LiveProvider>

			    {this.state.content}
			    <TEST />
 			</div>
 		);

 	}
}
export default Upload