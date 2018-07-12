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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import Grid from '@material-ui/core/Grid'

class NewsCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled : false,
			dialogOpen: false,
			Items: [],
			query: "bitcoin",
			country: "de",
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
	}

	handleData(data) {
		console.log(data);
		const listItems = data.articles.map((data) =>
			  <li>{data.source.name} : <a href={data.url}>{data.title}</a></li>
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

	handleChangeInput(event) {
    	this.setState({ query: event.target.value });
  	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		let ctry = "country="+this.state.country;
		let catery = "&q="+this.state.query;
		const newsAPI = "https://newsapi.org/v2/top-headlines?" + ctry + catery;
		const API_KEY = "17c1decdae4e4e36b7f8650b368616b3";

		fetch(newsAPI + "&apiKey=" + API_KEY)
			.then((response) => response.json())
			.then((data) => this.handleData(data));

	}

	render() {
		return (
		    <Draggable disabled={this.state.disabled} {...this.props}>
	        	<div style={{ width: 900 }}>
	        		<Card className="card">
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
	      					        <IconButton onClick={this.handleDialogOpen.bind(this)}>
	                					<MoreVertIcon />
	              					</IconButton>
	              				</div>
	        				}
	        			/>
	        			<CardContent className="content">
	                		<Typography variant="headline" component="h2">
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
	            					id="category" 
	            					value={this.state.category} 
	            					onChange={this.handleChangeInput.bind(this)} 
	            					label="Kategorie"
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