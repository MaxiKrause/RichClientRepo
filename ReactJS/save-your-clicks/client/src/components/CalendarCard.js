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
import BigCalendar from 'react-big-calendar'
import events from './events'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';


class CalendarCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled : false,
			dialogOpen: false,
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

	
	handleDialogOpen() {
		this.setState({
			dialogOpen: true,
			disabled: true
		});
	}

	handleDialogClose(event) {
		this.setState({dialogOpen: false});
	}

	handleChangeInput(event) {
		
  	}

	componentDidMount() {
		
	}

	componentWillMount() {
		BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
	}

	render() {
		let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
		return (
		    <Draggable disabled={this.state.disabled} {...this.props}>
	        	<div style={{ width: 900,  height:600 }}>
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
	        			<CardContent>
	                		<BigCalendar
							    events={events}
							    views={allViews}
							    step={60}
							    showMultiDayTimes
							    defaultDate={new Date(2015, 3, 1)}
							  />	                		
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

export default CalendarCard;