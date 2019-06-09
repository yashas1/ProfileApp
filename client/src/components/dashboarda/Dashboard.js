import React, { Component } from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from "../../actions/profileActions"
import spinner from "../../images/lg.ajax-spinner-gif.gif";
import {Link} from 'react-router-dom';
import ProfileActions from "./profileActions"
import {deletAccount} from "../../actions/profileActions"
import Exprience from "./Exprience"
import Education from "./Education"
 class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  OnDelete=(e)=>{
    
    this.props.deletAccount();
  }


  render() {

   const {user}=this.props.auth;
   const{loading,profile}=this.props.profile;
  
   
   let dashboardContent;

   if(profile==null ||loading){

    dashboardContent =<img src={spinner}style={{ width: '200px', margin: 'auto', display: 'block' }}
    alt="Loading..." ></img>
   }
   else{
   if(Object.keys(profile).length>0){
    
    
      
dashboardContent=(<div>
      
  <p className="green text-muted">Welcome <b style={{fontSize:'30px',color:'#F9D342'}}><Link to={`profile/${profile.handle}`}>{user.name}</Link></b> </p>

  <ProfileActions/>
  <Exprience exprience={profile.experience}/>
  <Education education={profile.education}/>
  <div style={{marginBottom:'60px'}}>
<button  onClick={this.OnDelete}
className="btn btn-danger">Delete My Account</button>

  </div>
  
  </div>)

   }
   else{
     
    dashboardContent=(
     <div>
      
       <p className="green text-muted">Welcome <b style={{fontSize:'30px',color:'#F9D342'}}>{user.name}</b> </p>
       <p>You have not yet created the profile yet, please create</p>
       <Link to="/create/profile"  className="btn btn-lg btn-success">Create profile</Link>
     </div>

    )

   }

   }

    return (
      <div className="dashbaord">
        <div className="container">
       <div className="row">
       <div className="col-md-8">
       <h1 className="display-4">Dashbaord</h1>
       {dashboardContent}
       </div>


       </div>


        </div>
        
      </div>
    )
  }
}

// Dashboard.Proptypes={
// getCurrentProfile: Proptypes.func.isRequired,
// auth:Proptypes.Object.isRequired,
// profile:Proptypes.Object.isRequired

// }

const mapStateProps =state=>({
profile: state.profile,
auth: state.auth

})

export default connect(mapStateProps,{ getCurrentProfile,deletAccount})(Dashboard);