import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// The Header creates links that can be used to navigate
// between routes.


class Header extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onMouseOver={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><Link to='/home'>Home</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/login'>Login</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/register'>Register</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/settings'>Settings</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/upload'>Upload</Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to='/dragtest'>Drag</Link></MenuItem>
        </Menu>
        <Button onClick={() => this.props.auth.logout()}>
          Log Out 
        </Button>
      </div>


    );
  }
}

export default Header