import React, { Component } from 'react';
import './Upload.css';
import Button from '@material-ui/core/Button'
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  generateElement,
} from 'react-live'

class Upload extends Component {

	constructor(props) {
    super(props);
    const div = generateElement({code : '<div> </div>'});
    const startCode = 	
    `class DragCard extends React.Component {
		render() {
			return (
				<Draggable>
					<Card>
						<div>
							Hello World!
						</div>
					</Card>
				</Draggable>
			);
		}
	}`;
	const scope = {Draggable, Card, React};
    this.state = {
			content: startCode,
			component: div,
			code: startCode,
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
 		this.props.auth.getProfile((err, profile) => {
 			fetch('/api/saveComponent', {
	 			method: 'POST',
	 			headers: {
	 				'Accept': 'application/json',
	 				'Content-Type': 'application/json'
	 			},
	 			body: JSON.stringify({
	 				component: code,
	 				userid: profile.sub
 			})
 		});
 		})
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

 				<LiveProvider code={this.state.code} scope={{Draggable, Card, React}}>
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