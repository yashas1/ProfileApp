import React, { Component } from 'react'
import ProfileHeader from "./ProfileHeader"
import ProfileAbout from "./ProfileAbout"
import ProfileCre from "./ProfileCre";
import ProfileGitHub from "./ProfileGitHub"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {getProfileByHandle} from "../../actions/profileActions"
import spinner from "../../images/lg.ajax-spinner-gif.gif";
 class Profile extends Component {

   componentDidMount(){
  if(this.props.match.params.handle){
    
   this.props.getProfileByHandle(this.props.match.params.handle)

    }
 

}
componentWillReceiveProps(nextprops){
  if(nextprops.profile.profile==null && this.props.profile.loading){

    this.props.history.push('/not-found');
  }


}

    render() {
      
        const {profile,loading}=this.props.profile;
        let profileContent;
         
         if(profile===null||loading)
         {
               profileContent=<img src={spinner}style={{ width: '200px', margin: 'auto', display: 'block' }}
               alt="Loading..." ></img>

         }
         else{
          
           profileContent=(
            <div> 
                <div className="row">
                
                    <Link to="/profiles" className="btn btn-info btn-sm mt-3 mb-3 float-left">Back To Profiles</Link>              
                  
                    <div className="col-md-12">
                    <ProfileHeader  profile={profile}/>
                     <ProfileAbout  profile={profile}/> 
                    <ProfileCre profile={profile}/>
                    {profile.github?(<ProfileGitHub username={profile.github}/>):null}
                    </div>
                  </div>
            </div>


           )
         }

        return (
         <div>
         <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
            </div> 
        )
    }


}

const mapStateToProps =state=>({
profile:state.profile

})


export default connect(mapStateToProps,{getProfileByHandle})(Profile);