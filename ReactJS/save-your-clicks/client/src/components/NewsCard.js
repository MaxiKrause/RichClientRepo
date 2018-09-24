import React from 'react';
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockIcon from '@material-ui/icons/Lock';
import UnlockIcon from '@material-ui/icons/LockOpen';
import './NewsCard.css';
import request from 'superagent';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


class NewsCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: props.defaultPositon,
			disabled : false,
			dialogOpen: false,
			Items: [],
			query: "",
			country: "",
			language: "de",
			category: "",
			sources: "",
		};
	}

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
		if (!disabled){
    		this.props.auth.getProfile((err, profile) => {
    			const message = {userid: profile.sub, widgetid: this.props.id, name:"news", position: this.state.position}
				request
		        .post('/api/savewidgetposition')
		        .send(message)
		        .set('Accept', 'application/json')
		        .end((err, res) => {
		          if (err || !res.ok) {
		            console.log('Failure');
		          }
		        });
	        })   	
    	}
	}

	handleDrag(e, ui) {
	    this.setState({
	      position: {
	        x: ui.x,
	        y: ui.y,
	      }
	    });
	}
	
	handleData(data) {
		const listItems = data.articles.map((data, i) =>
			  <li key={i}>{data.source.name} : <a href={data.url}>{data.title}</a></li>
		);
		this.setState({Items: listItems});
	}

	handleForecast(data) {
		console.log(data);
	}

	handleDialogOpen() {
		this.setState({
			dialogOpen: true,
			disabled: true
		});
	}

	handleDialogClose(event) {
		this.setState({dialogOpen: false});
		this.fetchData();
	}

	handleChangeQuery(event) {
    	this.setState({ query: event.target.value });
  	};

  	handleChangeCountry(event) {
    	this.setState({ country: event.target.value });
  	};

  	handleChangeCategory(event) {
    	this.setState({ category: event.target.value });
  	};

  	handleChangeLanguage(event) {
    	this.setState({ language: event.target.value });
  	};

  	handleChangeSources(event) {
    	this.setState({ sources: event.target.value });
  	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		let query = "q="+this.state.query;
		let country = "&country="+this.state.country;
		let sources = "&sources="+this.state.sources;
		let language = "&language="+this.state.language;
		let category = "&category="+this.state.category;
		
		const newsAPI = "https://newsapi.org/v2/top-headlines?" + query + country + sources + language + category;
		const API_KEY = "17c1decdae4e4e36b7f8650b368616b3";

		fetch(newsAPI + "&apiKey=" + API_KEY)
			.then((response) => response.json())
			.then((data) => this.handleData(data));

	}

	render() {
		return (
		    <Draggable onDrag={this.handleDrag.bind(this)} disabled={this.state.disabled} {...this.props}>
	        	<div style={{ maxWidth: 900, maxHeight: 350 }}>
	        		<Card className="card">
	        			<CardHeader 	
	        				avatar={
				                <h1> Nachrichten </h1>
				            }	             				
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
	      					        <IconButton onClick={this.handleDialogOpen.bind(this)}>
	                					<MoreVertIcon />
	              					</IconButton>
	              				</div>
	        				}
	        			/>
	        			<CardContent className="content">
	                		<Typography component="h2">
	                  			<ul>{this.state.Items}</ul>
	                		</Typography>
	              		</CardContent>
	              		<CardActions>
	              		</CardActions>
	            	</Card>
	            	<Dialog
	            		open={this.state.dialogOpen}
          			>
          				<div>
          					<DialogTitle>
          						Einstellungen
          					</DialogTitle>
          					<DialogContent>
	            				<TextField
	            					id="query" 
	            					value={this.state.query} 
	            					onChange={this.handleChangeQuery.bind(this)} 
	            					label="Suchbegriff"
	            				/>
	            				<TextField
	            					id="category" 
	            					value={this.state.category} 
	            					onChange={this.handleChangeCategory.bind(this)} 
	            					label="Kategorie"
	            				/>
	            				<TextField
	            					id="sources" 
	            					value={this.state.sources} 
	            					onChange={this.handleChangeSources.bind(this)} 
	            					label="Quellen"
	            				/>
	            				<TextField
	            					id="language" 
	            					value={this.state.language} 
	            					onChange={this.handleChangeLanguage.bind(this)} 
	            					label="Sprache"
	            				/>
	            				<TextField
	            					id="country" 
	            					value={this.state.country} 
	            					onChange={this.handleChangeCountry.bind(this)} 
	            					label="Land"
	            				/>
	            			</DialogContent>
	    					<DialogActions>
	    						<Button onClick={() => this.setState({dialogOpen: false})} color="primary" id="cancel">
					            	Abbrechen
					            </Button>
					            <Button onClick={this.handleDialogClose.bind(this)} color="primary" id="save">
					            	Speichern
					            </Button>
	    					</DialogActions>
          				</div>
          			</Dialog>
	          	</div>
	        </Draggable>
		);
	}
}

export default NewsCard;