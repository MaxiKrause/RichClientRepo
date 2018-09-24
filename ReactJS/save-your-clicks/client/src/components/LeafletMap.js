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
import './LeafletMap.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import request from 'superagent';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import Grid from '@material-ui/core/Grid';

import { Map, TileLayer } from 'react-leaflet';

class LeafletMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: props.defaultPositon,
			disabled : false,
			dialogOpen: false,
			lat: 51.505,
      		lng: -0.09,
      		zoom: 13
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
    			const message = {userid: profile.sub, widgetid: this.props.id, name:"map", position: this.state.position}
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
	}

	render() {
		const coords = [this.state.lat, this.state.lng];
		return (
		    <Draggable onDrag={this.handleDrag.bind(this)} disabled={this.state.disabled} position={this.state.position} {...this.props}>
	        	<div style={{ width: 500 }}>
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
	              				</div>
	        				}
	        			/>
	        			<CardContent className="no-cursor">
	        				<Map center={coords} zoom={this.state.zoom} style={{ height: 200 }}>
					          <TileLayer
					            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					          />
					        </Map>
	              		</CardContent>
	              		<CardActions>
	              		</CardActions>
	            	</Card>
	          	</div>
	        </Draggable>
		);
	}
}

export default LeafletMap;