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



class Home extends Component {
	 constructor(props) {
    super(props);
    this.state = {
      components: [],
      loaded: false,
      standardComponents: [{}],
      anchorEl: null,
      index: "",
      id: 1 ,
    };

    this.addYT = this.addYT.bind(this) 
  }

  componentDidMount() {
    const id = this.props.auth.getProfile((err, profile) => {
      const userid = profile.sub;

      fetch("/api/getComponents?userid=" + userid)
        .then((response) => response.json())
        .then((data) => this.handleComponents(data));
    })
  }

  componentDidUpdate() {
    console.log(this.state.standardComponents)  
  }

  getNewId() {
    let id = Object.assign(this.state.id)
    id++
    this.setState({id: id})
    return this.state.id
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (route) => {
    this.setState({ anchorEl: null });
  };

  constructComponent() {
    let card
    this.state.standardComponents.map((comp)=>{
      //card = comp.type+" auth="+comp.auth+" grid="+comp.grid+" bounds=\u0022"+comp.bounds+"\u0022"
      //card = React.createElement('YTCard', {auth: comp.auth, grid: comp.grid, bounds: comp.bounds}, null)
      card = < comp.type />
    });
    return card
  }

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

  removeComp = (id, e) => {
    const comp = Object.assign([], this.state.standardComponents)
    let index = comp.findIndex((element)=>{return element.id===id})
    comp.splice(index, 1)
    this.setState({standardComponents: comp})
  }

  addWeather() {
  this.handleClose()
    const comp = Object.assign([], this.state.standardComponents)

    comp.push({id:this.getNewId(), card:<DragCard auth={this.props.auth} grid={[25, 25]} bounds="html" 
                delEvent={this.removeComp.bind(this,this.state.id)}/>})

    this.setState({standardComponents: comp}) 
  }

  addMap() {
    this.handleClose()
    const comp = Object.assign([], this.state.standardComponents)

    comp.push({id:this.getNewId(), card:<LeafletMap auth={this.props.auth} grid={[25, 25]} bounds="html" 
                delEvent={this.removeComp.bind(this,this.state.id)}/>})

    this.setState({standardComponents: comp}) 
  }

  addTwitch() {
    this.handleClose()
    const comp = Object.assign([], this.state.standardComponents)

    comp.push({id:this.getNewId(), card:<TwitchCard auth={this.props.auth} grid={[25, 25]} bounds="html" 
                delEvent={this.removeComp.bind(this,this.state.id)}/>})

    this.setState({standardComponents: comp}) 
  }

  addNews() {
    this.handleClose()
    const comp = Object.assign([], this.state.standardComponents)

    comp.push({id:this.getNewId(), card:<NewsCard auth={this.props.auth} grid={[25, 25]} bounds="html" 
                delEvent={this.removeComp.bind(this,this.state.id)}/>})

    this.setState({standardComponents: comp}) 
  }

  addYT() {
    this.handleClose()
    const comp = Object.assign([], this.state.standardComponents)

    comp.push({id:this.getNewId(), card:<YTCard auth={this.props.auth} grid={[25, 25]} bounds="html" 
                delEvent={this.removeComp.bind(this,this.state.id)}/>})

    this.setState({standardComponents: comp}) 
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
          <MenuItem onClick={() => this.addWeather()}>Wetter</MenuItem>
          <MenuItem onClick={() => this.addNews()}>Nachrichten</MenuItem>
          <MenuItem onClick={() => this.addYT()}>Youtube</MenuItem>
          <MenuItem onClick={() => this.addTwitch()}>Twitch</MenuItem>
          <MenuItem onClick={() => this.addMap()}>Karte</MenuItem>
        </Menu>
          {this.state.components.map((Components) => <Components />)}
          {this.state.standardComponents.map((comp, index) => {return comp.card})}         
  			</div>
  		);
	}
}

export default Home