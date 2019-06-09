import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect } from 'react-redux';
import {logoutUser}  from '../../actions/authActions';
import {clearCurrentProfile}  from '../../actions/profileActions';

  class Navbar extends Component {

   OnLogoutclick=(e)=>{
     
    this.props.clearCurrentProfile();
     this.props.logoutUser();
     
    }

  render() {
   const {isAuthenticated,user}= this.props.auth;
  
   const authLinks=(
    <div className="my-2 my-lg-0">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
        <Link className="nav-link" to="/feed">PostFeed <span className="sr-only">(current)</span></Link>
      </li>
    <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">Devloper <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
      
        <a className="nav-link" href="/" onClick={this.OnLogoutclick} >
        <img  className="rounded-circle" src={user.avatar} style={{width:'35px',marginRight:'10px'}}alt={user.name} title ="you must have gravater connected to your email to display image"></img> 
        {' '}
          logout<span className="sr-only">(current)</span></a>
      
      </li>
    </ul>
    </div>

   )




   const guestLinks=(
    <div className="my-2 my-lg-0">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/register">SignUP <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/Login">LogIn <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
    </div>

   )

    return (
         
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed">
    <div className="container">
  <Link className="navbar-brand" to="/">{' '}ProfileApp</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
 
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/profiles">Profiles <span className="sr-only">(current)</span></Link>
      </li>

    </ul>
   {isAuthenticated?authLinks:guestLinks}
    
   
    </div>
  </div>
</nav>

    )
  }
}


Navbar.propTypes={
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired 

}

const mapStateToprops=(state)=>({
auth:state.auth
})

export default connect(mapStateToprops,{logoutUser,clearCurrentProfile})(Navbar);