import React, { Component } from 'react';
import './Upload.css';
import Button from '@material-ui/core/Button'
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';	
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import UnlockIcon from '@material-ui/icons/LockOpen';
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
    
    constructor(props) {
      super(props);
      this.state = {
	      disabled: true,
	      sdata: "",
      };
    }

      handleData(data) {
      this.setState({sdata: data});
    }

      fetchData() {	

      	const titlesearch = "t="+this.state.title;

      const newsAPI = "https://omdbapi.com/?"+titlesearch;
      const API_KEY = "1d30d952";

	    fetch(newsAPI + "&plot=full&apikey=" + API_KEY)
	      .then((response) => response.json())
	      .then((data) => this.handleData(data));
    } 


	handleDialogClose(event) {
		this.fetchData();
	}

	handleChangeTitle(event) {
    	this.setState({ title: event.target.value });
  	};

  	clearSelection() {
	    if (window.getSelection) {
	        window.getSelection().removeAllRanges();
	    } else if (document.selection) {
	        document.selection.empty();
	    }
	}

  	changeMoveState(e) {
		e.preventDefault();
    	e.stopPropagation();
    	this.clearSelection();
    	const {disabled} = this.state;
    	this.setState({disabled: !disabled});
	}

    render() {
      return (
        <Draggable disabled={this.state.disabled}>
          <Card>
          <CardHeader 	             				
	        action={
	        	<div>
		            <IconButton size="small" onClick={this.changeMoveState.bind(this)}>
		        		{
		    				this.state.disabled && (
		    					<LockIcon />
		    				)
		    			}
		    			{
		    				!this.state.disabled && (
		    					<UnlockIcon />
		    				)
		    			}
	      			</IconButton>
	        	</div>
	        }
	      />
            <div>
            	<TextField 
	            	id="title" 
	            	onChange={this.handleChangeTitle.bind(this)} 
	            	label="Filmtitel"
	            />
            	<Button onClick={this.handleDialogClose.bind(this)} color="primary" id="save">
			      	Senden
			    </Button>

		        <TextField
		          label="Erscheinungsjahr"
		          InputLabelProps={{
		            shrink: true,
		          }}
		          placeholder="Erscheinungsjahr"
		          value={this.state.sdata.Year || ''}
		          margin="normal"
		        />

		        <TextField
		          label="Genre"
		          InputLabelProps={{
		            shrink: true,
		          }}
		          placeholder="Genre"
		          value={this.state.sdata.Genre || ''}
		          fullWidth
		          margin="normal"
		        />

		        <TextField
		          label="Handlung"
		          InputLabelProps={{
		            shrink: true,
		          }}
		          placeholder="Handlung"
		          value={this.state.sdata.Plot || ''}
		          multiline
         		  rowsMax="9"
		          fullWidth
		          margin="normal"
		        />

		        <TextField
		          label="Bewertung"
		          InputLabelProps={{
		            shrink: true,
		          }}
		          placeholder="Bewertung"
		          value={this.state.sdata.imdbRating || ''}
		          margin="normal"
		        />
            </div>
          </Card>

        </Draggable>
      );
    }
  }`;
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

 				<LiveProvider code={this.state.code} scope={{Draggable, Card, React, CardHeader, IconButton, MoreVertIcon, TextField, Button
 															,UnlockIcon, LockIcon}}>
			      <LiveEditor className="Editor"  />
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