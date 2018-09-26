import React, { Component } from 'react';
import DragCard from './DragCard.js';
import LeafletMap from './LeafletMap.js';
import NewsCard from './NewsCard.js';
import YTCard from  './YTCard.js';
import TwitchCard from  './TwitchCard.js';
import {generateElement} from 'react-live';
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Home.css'
import request from 'superagent';

let userid;

class Home extends Component {
	 constructor(props) {
    super(props);
    this.state = {
      components: [],
      loaded: false,
      standardComponents: [],
      anchorEl: null,
    };

    this.addYT = this.addYT.bind(this) 
	this.constructWidgets = this.constructWidgets.bind(this)
  }



  componentDidMount() {
    const id = this.props.auth.getProfile((err, profile) => {
     userid = profile.sub;

      fetch("/api/getComponents?userid=" + userid)
        .then((response) => response.json())
        .then((data) => this.handleComponents(data));
		
	  const message = {userid: userid};
	  request
		.post('/api/getwidgets')
		.send(message)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err || !res.ok) {
				console.log('Failure');
			 } else {
				 if (res.body[0]==null)
					return
				 else{
					this.constructWidgets(res.body)
				 }
			 }
		}); 
	});

  }
  
  constructWidgets(data) {
   data.forEach(function(element) {
	   for ( var key in element ) {
			if(element[key][0].name=="weather"){
				this.addWeather(false, key, element[key][0].settings, element[key][0].position)
			}
			else if(element[key][0].name=="map"){
				this.addMap(false, key, element[key][0].position)
			}
			else if(element[key][0].name=="twitch"){
				this.addTwitch(false, key, element[key][0].settings, element[key][0].position)
			}
			else if(element[key][0].name=="news"){
				this.addNews(false, key, element[key][0].position)
			}
			else if(element[key][0].name=="youtube"){
				this.addYT(false, key, element[key][0].settings, element[key][0].position)
			}
				
	  }
    }.bind(this));
  }
  
  constructComponent() {
    let card
    this.state.standardComponents.map((comp)=>{
      //card = comp.type+" auth="+comp.auth+" grid="+comp.grid+" bounds=\u0022"+comp.bounds+"\u0022"
      //card = React.createElement('YTCard', {auth: comp.auth, grid: comp.grid, bounds: comp.bounds}, null)
      card = < comp.type />
    });
    return card
  }
  
  saveWidget(widgetName, callback, settings) {
	  	const message = {userid: userid, name: widgetName, settings: settings}
		request
		.post('/api/savewidget')
		.send(message)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err || !res.ok) {
				console.log('Failure');
			}
			else {
				callback(res.text);
			}
		});
  }
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (route) => {
    this.setState({ anchorEl: null });
  };

  handleComponents(data) {
    if (!data) return;
    let list = [];
    for (var i = data.length - 1; i >= 0; i--) {
      list.push(Element = generateElement({code: data[i].component, scope:{Draggable, Card}}));
    }
    this.setState({
      components : list,
    });
  }

  addWeather(saveInDB, key, city, position) {
	 this.handleClose()
	 const comp = Object.assign([], this.state.standardComponents)
	  
	if (saveInDB){
		this.saveWidget("weather", function(widgetID){
			comp.push(<DragCard auth={this.props.auth} id={widgetID} city="berlin,de" grid={[25, 25]} bounds="html" defPosition={{x: 0, y: 0}}/>)
			this.setState({standardComponents: comp}) 
		}.bind(this), "berlin,de");
	}
	else {
		comp.push(<DragCard auth={this.props.auth} id={key} city={city} grid={[25, 25]}  bounds="html" defPosition={position}/>)
		this.setState({standardComponents: comp}) 
	}
  }

  addMap(saveInDB, key, position) {
	 this.handleClose()
	 const comp = Object.assign([], this.state.standardComponents)
	  
	if (saveInDB){
		this.saveWidget("map", function(widgetID){
			comp.push(<LeafletMap auth={this.props.auth} id={widgetID} grid={[25, 25]} bounds="body" defPosition={{x: 0, y: 0}}/>)
			this.setState({standardComponents: comp}) 
		}.bind(this));
	}
	else {
		comp.push(<LeafletMap auth={this.props.auth} id={key} grid={[25, 25]} bounds="body" defPosition={position}/>)
		this.setState({standardComponents: comp}) 
	}
  }
  
  addTwitch(saveInDB, key, channelName, position) {
	 this.handleClose()
	 const comp = Object.assign([], this.state.standardComponents)
	  
	if (saveInDB){
		this.saveWidget("twitch", function(widgetID){
			comp.push(<TwitchCard auth={this.props.auth} id={widgetID} channelName="" grid={[25, 25]} bounds="body" defPosition={{x: 0, y: 0}}/>)
			this.setState({standardComponents: comp}) 
		}.bind(this));
	}
	else {
		comp.push(<TwitchCard auth={this.props.auth} id={key} channelName={channelName} grid={[25, 25]} bounds="body" defPosition={position}/>)
		this.setState({standardComponents: comp}) 
	}
  }
  
  addNews(saveInDB, key, position) {
	 this.handleClose()
	 const comp = Object.assign([], this.state.standardComponents)
	  
	if (saveInDB){
		this.saveWidget("news", function(widgetID){
			comp.push(<NewsCard auth={this.props.auth} id={widgetID} grid={[25, 25]} bounds="body" defPosition={{x: 0, y: 0}}/>)
			this.setState({standardComponents: comp}) 
		}.bind(this));
	}
	else {
		comp.push(<NewsCard auth={this.props.auth} id={key} grid={[25, 25]} bounds="body" defPosition={position}/>)
		this.setState({standardComponents: comp}) 
	}
  }

  addYT(saveInDB, key, link, position) {
	 this.handleClose()
	 const comp = Object.assign([], this.state.standardComponents)
	  
	if (saveInDB){
		this.saveWidget("youtube", function(widgetID){
			comp.push(<YTCard className="Widget" auth={this.props.auth} id={widgetID} grid={[25, 25]} bounds="body" defPosition={{x: 0, y: 0}}/>)
			this.setState({standardComponents: comp}) 
		}.bind(this));
	}
	else {
		comp.push(<YTCard className="Widget" auth={this.props.auth} id={key} link={link} grid={[25, 25]} bounds="body" defPosition={position}/>)
		this.setState({standardComponents: comp}) 
	}
  }
  


	render() {
      const { anchorEl } = this.state;
  		return(
  			<div>
    			<p>Home-Seite</p>
    			<Button
          variant="contained"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Widget hinzufügen
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.addWeather(true)}>Wetter</MenuItem>
          <MenuItem onClick={() => this.addNews(true)}>Nachrichten</MenuItem>
          <MenuItem onClick={() => this.addYT(true)}>Youtube</MenuItem>
          <MenuItem onClick={() => this.addTwitch(true)}>Twitch</MenuItem>
          <MenuItem onClick={() => this.addMap(true)}>Karte</MenuItem>
        </Menu>
          {this.state.components.map((Components) => <Components />)}
          {this.state.standardComponents}         
  			</div>
  		);
	}
}

export default Home