import React from 'react'
import { Router, Route } from 'react-router-dom'
import App from './App'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Settings from './Settings'
import Upload from './Upload'
import Dragtest from './Dragtest'
import Auth from '../Auth/Auth';
import history from '../history';
import Callback from './Callback/Callback'

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const Main = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} /> } />
          <Route path='/login' render={(props) => <Login auth={auth} {...props} />} />
          <Route path='/register' component={Register}/>
          <Route path='/settings' component={Settings}/>
          <Route path='/dragtest' component={Dragtest}/>
          <Route path='/upload' render={(props) => <Upload auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />} 
          } />
        </div>
      </Router>
  );
}