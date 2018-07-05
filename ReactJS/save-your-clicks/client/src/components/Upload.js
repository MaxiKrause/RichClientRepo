import React, { Component } from 'react';
import './Upload.css';
import Babel from 'babel-standalone';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  withLive
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

 	render() {
 		const {isAuthenticated} = this.props.auth;
 		var input = "<strong>Hello</strong>";
 		var output = Babel.transform(input);
 		console.log(output.code);
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
 			</div>
 		);

 	}
}
export default Upload