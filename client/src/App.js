import React,{Component} from 'react';
import Navbar from "./components/layout/Navbar"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Footer from './components/layout/Footer';
import Landing from './components/layout/landing';
import register from './components/Auth/register';
import login from "./components/Auth/login";
import {Provider} from 'react-redux';
import store from "./source";
import jwt_decode from 'jwt-decode';
import setAuthtoke from './utils/setAuthtoken';
import {SET_CURRENT_USER} from './actions/types'
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import Dashboard from './components/dashboarda/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile'
import PrivateRoute from "../src/components/common/PrivateRoute"
import EditProfile from "./components/edit-profile/EditProfile"
import AddExprience from './components/add-cradentials/AddExprience';
import AddEducation from './components/add-cradentials/AddEducation';
import profiles from "./components/profiles/profiles"
import Profile from "./components/Profile/Profile"
import Notfound from './components/NotFound/Notfound';
import Postt from './components/post/Postt'
import Posts from './components/Posts/Post';


if(localStorage.jwtToken){

  setAuthtoke(localStorage.jwtToken);

  const decode =jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decode));

  const currentTime=Date.now()/1000;
  if (decode.exp<currentTime)
  {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
  window.location.href='/login';
  }

}

class App extends Component{

  render(){
  return (
   <Provider store={store}> 
        <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/"component ={Landing}/>
              
                <Route exact path="/register" component={register} />
                <Route exact path="/login" component={login}/>
                <Switch><PrivateRoute exact path="/Dashboard" component={Dashboard}/></Switch>
                <Switch><PrivateRoute exact path="/create/profile" component={CreateProfile}/></Switch>
                <Switch><PrivateRoute exact path="/edit/profile" component={EditProfile}/></Switch>
                <Switch><PrivateRoute exact path="/add-exprience" component={AddExprience}/></Switch>
                <Switch><PrivateRoute exact path="/add/education" component={AddEducation}/></Switch>
                <Route exact path="/profiles" component={profiles}/>
                <Route exact path="/profile/:handle" component={Profile}/>
                <Route exact path="/not-found" component={Notfound}/>
                <Switch><PrivateRoute exact path="/feed" component={Posts}/></Switch>
                <Switch><PrivateRoute exact path="/post/:id" component={Postt}/></Switch>
              <Footer />
              </div>
            </Router>
    </Provider>
  );
}
}
export default App;
