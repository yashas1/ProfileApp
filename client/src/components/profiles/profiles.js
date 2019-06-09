import React, { Component } from 'react'
import {connect} from "react-redux";
import {getProfiles} from "../../actions/profileActions"
import spinner from "../../images/lg.ajax-spinner-gif.gif";
import Profile_items from "./profile_items"
 class profiles extends Component {

componentDidMount(){
this.props.getProfiles();


}

    render() {
        const {profiles,loading}=this.props.profile;
        let profileItems=[];
       if(profiles===null||loading)
       {

        profileItems=<img src={spinner}style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..." ></img>

       }
       else if (profiles.length>0)
       {
          
        profileItems=profiles.map(profile=>(
          <Profile_items key={profile._id} profile={profile} />

        ));
        

       }
       else{
           profileItems=<h4>Profile is not found....</h4>
       }


       return(
         
        <div className="profiles">
         <div className="container">
        <div className="row">
         <div className="col-md-12">
        <h1 className='display-4 text-center'>Devloper Profile</h1>
        <p className="text-center">Browse and connect with devlopers </p>

         {profileItems}


         </div>




        </div>



         </div>



        </div>
        


       )

    }
}



const mapStatetoProps = state=>({
profile:state.profile

})

export default connect (mapStatetoProps,{getProfiles}) (profiles);