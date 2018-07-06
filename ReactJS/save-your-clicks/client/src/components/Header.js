import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Logout } from 'mdi-material-ui'
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';
import History from '../history'




// The Header creates links that can be used to navigate
// between routes.


class Header extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (route) => {
    this.setState({ anchorEl: null });
    History.replace(route)
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          variant="contained"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.handleClose("/home")}>Home</MenuItem>
          <MenuItem onClick={() => this.handleClose("/register")}>Register</MenuItem>
          <MenuItem onClick={() => this.handleClose("/settings")}>Settings</MenuItem>
          <MenuItem onClick={() => this.handleClose("/upload")}>Upload</MenuItem>
          <MenuItem onClick={() => this.handleClose("/dragtest")}>Drag</MenuItem>
        </Menu>
        
        <div className="Logout-Button">
          <Button  variant="contained" onClick={() => this.props.auth.logout()} >
            <Logout />
            Log Out 
          </Button>
        </div>
      </div>


    );
  }
}

export default Header