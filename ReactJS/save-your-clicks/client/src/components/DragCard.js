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
import DeleteIcon from '@material-ui/icons/Delete';
import './Dragtest.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import request from 'superagent';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import Grid from '@material-ui/core/Grid'

class DragCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: {
       			x: 0, y: 0
			},
			disabled : false,
			weatherData: null,
			WeatherIMG: null,
			cityName: "Loading...",
			dialogOpen: false,
			userCity: "London,uk",
			temp: "Loading..."
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
    			const message = {userid: profile.sub, position: {x: this.state.position.x, y: this.state.position.y}}
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
		console.log(data);
		//set Image
		this.setState({WeatherIMG : "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"});
		this.setState({cityName: data.name});
		this.setState({weatherData : data});
		this.setState({temp: data.main.temp})
	}

	handleForecast(data) {
		console.log(data);
		let list = data.list;
		let filteredList = [];
		var day = new Date(1999);
		console.log(day.getDate());

		for (let forecast of list) {
			let forecastDay = new Date(forecast.dt_txt);
			if(day.getDate() != forecastDay.getDate()) {
				filteredList.push(forecast);
				day = forecastDay;
			}
		}
		console.log(filteredList);
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
    	this.setState({ userCity: event.target.value });
  	};

	componentDidMount() {
		this.fetchData();
		this.props.auth.getProfile((err, profile) => {
			const message = {userid: profile.sub};
			request
		    .post('/api/getwidgetposition')
		    .send(message)
		    .set('Accept', 'application/json')
		    .end((err, res) => {
		       if (err || !res.ok) {
		         console.log('Failure');
		       } else {
		       		if (res.body[0]==null)
		       			return
		       		else
				      this.setState({
				     	 position: res.body[0].position
				   	  });
		       }
		    }); 
		})
	}

	fetchData() {
		const units = "&units=Metric";
		const cnt = "&cnt=5"
		const curWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + this.state.userCity + units;
		const forecast5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + this.state.userCity + units + cnt;
		const API_KEY = "63e1989514bf141a4fa6085fb66c5802";

		fetch(curWeatherAPI + "&appid=" + API_KEY)
			.then((response) => response.json())
			.then((data) => this.handleData(data));

		fetch(forecast5 + "&appid=" + API_KEY)
			.then((response) => response.json())
			.then((data) => this.handleForecast(data))

	}

	render() {
		return (
		    <Draggable onDrag={this.handleDrag.bind(this)} disabled={this.state.disabled} position={this.state.position} {...this.props}>
	        	<div style={{ maxWidth: 500 }}>
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
	              					<IconButton onClick={this.props.delEvent}>
	                					<DeleteIcon />
	              					</IconButton>
	              				</div>
	        				}
	        			/>
	        			<CardContent>
	                		<Typography variant="headline" component="h2">
	                  			{this.state.cityName} {this.state.temp}°C
	                		</Typography>
	                		<Grid
	                			container
	                			spacing="16"
	                			direction="row"
	                			justify="center"
	                			alignItems="center"

	                		>
	                			<Grid item><p>Hallo1</p></Grid>
	                			<Grid item><p>Hallo2</p></Grid>
	                			<Grid item><p>Hallo3</p></Grid>
	                		</Grid>	
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
	            					id="city" 
	            					value={this.state.userCity} 
	            					onChange={this.handleChangeInput.bind(this)} 
	            					label="Wetter für"
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

export default DragCard;