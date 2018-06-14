import React from 'react';
import DraggableCore from 'react-draggable';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Dragtest.css';

class DragCard extends React.Component {
	
	clearSelection() {
	    if (window.getSelection) {
	        window.getSelection().removeAllRanges();
	    } else if (document.selection) {
	        document.selection.empty();
	    }
	}

	render() {
		return (
		    <DraggableCore grid={[25, 25]} bounds="body" >
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
	                		<Button size="small" onClick={() => { props.disabled=true }}>Learn More</Button>
	              		</CardActions>
	            	</Card>
	          	</div>
	        </DraggableCore>
		);
	}
}