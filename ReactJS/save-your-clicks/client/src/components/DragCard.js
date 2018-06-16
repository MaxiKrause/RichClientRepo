import React from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockIcon from '@material-ui/icons/Lock';
import UnlockIcon from '@material-ui/icons/LockOpen';
import Image from 'material-ui-image';
import Sunny from '../assets/Weather/050-sun.svg';
import './Dragtest.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class DragCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled : false,
			weatherData: null,
			WeatherIMG: null,
			cityName: "Loading...",
			dialogOpen: false,
			userCity: "London,uk"
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
		//set Image
		this.setState({WeatherIMG : "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"});
		this.setState({cityName: data.name})
	}

	handleDialogOpen() {
		this.setState({
			dialogOpen: true,
			disabled: true
		});
	}

	handleDialogClose() {
		this.setState({dialogOpen: false});
		this.fetchData();
	}

	handleChangeInput(event) {
    	this.setState({ userCity: event.target.value });
  	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const curWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + this.state.userCity;
		const API_KEY = "63e1989514bf141a4fa6085fb66c5802";

		fetch(curWeatherAPI + "&appid=" + API_KEY)
			.then((response) => response.json())
			.then((data) => this.handleData(data));
	}

	render() {
		return (
		    <Draggable disabled={this.state.disabled} {...this.props}>
	        	<div style={{ width: 500 }}>
	        		<Card className="card">
	        			<CardHeader 
	        				avatar={
	        					<img src={this.state.WeatherIMG} />
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
	        			<CardContent>
	                		<Typography variant="headline" component="h2">
	                  			{this.state.cityName}
	                		</Typography>
	                		<Typography className="pos" color="textSecondary">
	                  			adjective
	                		</Typography>
	                		<Typography component="p">
	                  			well meaning and kindly.<br />
	                  			{'"a benevolent smile"'}
	                		</Typography>
	              		</CardContent>
	              		<CardActions>
	                		<Button>Learn More</Button>
	              		</CardActions>
	            	</Card>
	            	<Dialog
	            		open={this.state.dialogOpen}
          				onClose={this.handleDialogClose.bind(this)}
          			>
          				<DialogContentText>
              				Bitte Stadt eingeben.
            			</DialogContentText>
            			<InputLabel htmlFor="city">Name</InputLabel>
          				<Input id="city" value={this.state.userCity} onChange={this.handleChangeInput.bind(this)} />
          			</Dialog>
	          	</div>
	        </Draggable>
		);
	}
}

export default DragCard;