import React from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Lock from '@material-ui/icons/Lock';
import './Dragtest.css';

class DragCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {disabled : false};
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
    	let newMoveState = !disabled;
    	this.setState({disabled: newMoveState});
    	console.log(this.state.disabled);
	}

	render() {
		return (
		    <Draggable disabled={this.state.disabled} {...this.props}>
	        	<div>
	        		<Card className="card">
	        			<CardContent>
	                		<Typography className="title" color="textSecondary">
	                  			Word of the Day
	                		</Typography>
	                		<Typography variant="headline" component="h2">
	                  			YEET
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
	              			<IconButton size="small" onClick={this.changeMoveState.bind(this)}>
        						<Lock />
      						</IconButton>
	                		<Button>Learn More</Button>
	              		</CardActions>
	            	</Card>
	          	</div>
	        </Draggable>
		);
	}
}

export default DragCard;