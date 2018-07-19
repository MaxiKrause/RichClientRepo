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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import GetYTID from 'get-youtube-id'

class YTCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled : false,
			dialogOpen: false,
			embedlink: "",
			id: "",
			ytlink: "",
		};
	}

	getID(ytlink) {
		let ytid = GetYTID(ytlink);
		this.setState({id: ytid})
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

	
	handleDialogOpen() {
		this.setState({
			dialogOpen: true,
			disabled: true
		});
	}

	handleDialogClose(event) {
		this.setState({dialogOpen: false});

		let embid = "https://www.youtube.com/embed/"+this.state.id;

    	this.setState({ embedlink: embid})
	}

	handleChangeInput(event) {
		this.getID(event.target.value)
  	};

	componentDidMount() {

	}

	ytComponent() {
		return (<iframe width="420" height="315" allowFullScreen="true" title="YTCard"
					src={this.state.embedlink}>
				</iframe>);
	}

	render() {
		return (
		    <Draggable disabled={this.state.disabled} {...this.props}>
	        	<div style={{ width: 500 }}>
	        		<Card className="card">
	        			<CardHeader 
	        				avatar={
				                <h1> Youtube </h1>
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
	        				{this.state.embedlink !== "" ? this.ytComponent() : null}
	                			                		
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
	            					onKeyUp={this.handleChangeInput.bind(this)} 
	            					label="Youtube Link"
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

export default YTCard;