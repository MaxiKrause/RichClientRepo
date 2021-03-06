import React from 'react';
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockIcon from '@material-ui/icons/Lock';
import UnlockIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import request from 'superagent';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

class YTCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: props.defPosition,
			disabled : false,
			dialogOpen: false,
			dialogOpenDelete: false,
			channeltemp: "",
			channel: "",
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
    			const message = {userid: profile.sub, widgetid: this.props.id, name:"twitch", position: this.state.position, settings: this.state.channeltemp}
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
		this.setState({channel: this.state.channeltemp})
	}
	
	handleDialogOpenDelete() {
		this.setState({
			dialogOpenDelete: true,
		});
	}

	handleDialogCloseDelete(event) {
		this.setState({dialogOpenDelete: false});
		    	this.props.auth.getProfile((err, profile) => {
    			const message = {userid: profile.sub, widgetid: this.props.id}
				request
		        .post('/api/deleteWidget')
		        .send(message)
		        .set('Accept', 'application/json')
		        .end((err, res) => {
		          if (err || !res.ok) {
		            console.log('Failure');
		          }
				  else 
					  window.location.reload(); 
		        });
	        })   	
	}

	handleChangeInput(event) {
		this.setState({channeltemp: event.target.value})
  	};

	componentDidMount() {
		this.setState({channel: this.props.channelName})
	}

	twitchComponent() {
		return <ReactTwitchEmbedVideo channel={this.state.channel} layout="video"  width="600" />
	}

	render() {
		return (
		    <Draggable onDrag={this.handleDrag.bind(this)} disabled={this.state.disabled} {...this.props}>
	        	<div style={{ width: 700 }}>
	        		<Card className="card">
	        			<CardHeader 
	        				avatar={
				                <h1> Twitch </h1>
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
									<IconButton size="small"  onClick={this.handleDialogOpenDelete.bind(this)}>
										<DeleteIcon/>
									</IconButton>
	      					        <IconButton onClick={this.handleDialogOpen.bind(this)}>
	                					<MoreVertIcon />
	              					</IconButton>
	              				</div>
	        				}
	        			/>
	        			<CardContent>
	                		{this.state.channel!== "" ? this.twitchComponent() : null}	
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
	            					id="link" 	            					
	            					onChange={this.handleChangeInput.bind(this)} 
	            					label="Twitch Kanal Name"
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
				   <Dialog
	            		open={this.state.dialogOpenDelete}
          			>
          				<div>
          					<DialogTitle>
          						Einstellungen
          					</DialogTitle>
          					<DialogContent>
								Wollen Sie das Widget löschen?
	            			</DialogContent>
	    					<DialogActions>
	    						<Button onClick={() => this.setState({dialogOpenDelete: false})} color="primary" id="cancelDelete">
					            	Abrechen
					            </Button>
					            <Button onClick={this.handleDialogCloseDelete.bind(this)} color="primary" id="delete">
					            	Ja
					            </Button>
	    					</DialogActions>
          				</div>
          			</Dialog>
	          	</div>
	        </Draggable>
		);
	}
}

export default YTCard;