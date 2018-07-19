import React from 'react';
import Draggable from 'react-draggable';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Dragtest.css';

let drag=false;  

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

function DragCard(props){
    return (
    <Draggable grid={[25, 25]} bounds="body" {...props}>
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
            </Draggable>
  );
  }

class Dragtest extends React.Component {

 	render(props) {
 				return(
		 			<div style={{ width: 500 }}>
		 				<DragCard disabled={drag}/>
            <DragCard disabled={drag}/>
            <Button size="small" onClick={() => { (drag===true) ? drag=false : drag=true ;  clearSelection(); this.forceUpdate() }}>Learn More</Button>
		 			</div>
	 			)
 	}
}
export default Dragtest 