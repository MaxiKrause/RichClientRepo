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
import LockIcon from '@material-ui/icons/Lock';
import UnlockIcon from '@material-ui/icons/LockOpen';
import Image from 'material-ui-image';
import Sunny from '../assets/Weather/050-sun.svg';
import './Dragtest.css';

class DragCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled : false,
			weatherData: null,
			WeatherIMG: null,
			cityName: "Loading..."
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

	componentDidMount() {
		const curWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=London,uk"
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
	          	</div>
	        </Draggable>
		);
	}
}

export default DragCard;