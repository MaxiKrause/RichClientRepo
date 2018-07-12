import React, { Component } from 'react';
import './Upload.css';
import Button from '@material-ui/core/Button'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  generateElement,
  renderElementAsync
} from 'react-live'

import { serialize, deserialize } from "react-serialize";

class Upload extends Component {

	constructor(props) {
    super(props);
    const div = generateElement({code : '<div> </div>'});
    this.state = {
			content: "<strong>Hello World!</strong>",
			component: div,
		};
 	}

 	handleContent(data){
 		this.setState({ content: data});
 	}

 	renderElement() {
 		const code = this.state.content
 		return generateElement({code});
 	}

 	uploadComponent() {
 		const code = this.state.content;
 		const Component = generateElement({code});
 		this.setState({component: Component});

 		fetch('/api/saveComponent', {
 			method: 'POST',
 			headers: {
 				Accept: 'application/json',
 				'Content-Type': 'application/json'
 			},
 			body: {Component: <Component />},
 		});
 	}

 	render() {
 		const {isAuthenticated} = this.props.auth;
 		var TEST = this.state.component;
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
			    <Button color="primary" onClick={this.uploadComponent.bind(this)}>
			    	Hochladen
			    </Button>
			    <TEST />
 			</div>
 		);

 	}
}
export default Upload