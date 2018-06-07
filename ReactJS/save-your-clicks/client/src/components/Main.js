import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Settings from './Settings'
import Upload from './Upload'
import Auth from '../Auth/Auth';
import history from '../history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route path='/home' render={(props) => {
	  	handleAuthentication(props);
	  	return <Home />
	  }} />
	  <Route path='/login' render={(props) => <Login auth={auth} {...props} />} />
      <Route path='/register' component={Register}/>
      <Route path='/settings' component={Settings}/>
	  <Route path='/upload' render={(props) => <Upload auth={auth} {...props} />} />
    </Switch>
  </main>
)

export default Main