import React, { Component } from 'react'
import TextFiledGroup from "../common/TextFieldGroup"
import {connect} from 'react-redux'
import InputGroup from "../common/InputGroup"
import SelectListGroup from "../common/SelectListGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import {withRouter} from'react-router-dom'
import {createProfile,getCurrentProfile} from "../../actions/profileActions"
import isEmpty from "../../validation/is_Empty"  
import PropTypes from 'prop-types';
 class CreateProfile extends Component {
constructor(props){
super(props)

this.state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    github: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };
}

componentDidMount(){

    this.props.getCurrentProfile();
}
componentWillReceiveProps(nextProps){
if(nextProps.errors){

  this.setState({errors:nextProps.errors})
}

if(nextProps.profile.profile){
    
    const profile=nextProps.profile.profile;
   
  const skillscsv =profile.skills.join(",");

   profile.company=!isEmpty(profile.company)? profile.company :"";
   profile.website = !isEmpty(profile.website) ? profile.website : '';

      profile.location = !isEmpty(profile.location) ? profile.location : '';
      
      profile.github = !isEmpty(profile.github)
        ? profile.github
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

        this.setState({
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: skillscsv,
            github: profile.github,
            bio:     profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram: profile.instagram



        })
}

}



onSubmit=(e)=>{

  e.preventDefault();
  const profileData={

    handle: this.state.handle,
    company: this.state.company,
    website: this.state.website,
    location: this.state.location,
    status: this.state.status,
    skills: this.state.skills,
    github: this.state.github,
    bio: this.state.bio,
    twitter: this.state.twitter,
    facebook: this.state.facebook,
    linkedin: this.state.linkedin,
    youtube: this.state.youtube,
    instagram: this.state.instagram
  }
  this.props.createProfile(profileData,this.props.history)


}
onChange =(e)=>{
this.setState({
[e.target.name]:e.target.value

})

}


  render() {
const {errors} =this.state;
const displaySocialInputs =this.state.displaySocialInputs;
let socialInputs;
if(displaySocialInputs){
 socialInputs=(
<div>

<InputGroup
            placeholder="linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Facbook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
</div>

)


}

const options =[
{
  lable:'select professional status ',value:'0'
},
{
  lable:'Devloper',value:'Devloper'
},
{
  lable:'Junior Devloper ',value:'Junior Devloper'
},
{
  lable:'Student',value:'Student'
},

{
  lable:'Teacher',value:'Teacher'
}


]
    return (
      <div className="create-profile">
     <div className="container">
     <div className ="row">
 <div className="col-md-8 m-auto">
 <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* Means Required Fields</small>

<form onSubmit={this.onSubmit}>
<TextFiledGroup
placeholder="* profile Handle"
name="handle"
label="Handle"
value={this.state.handle}
onChange={this.onChange}
error={errors.handle}
info="A unique handle  for your profile Url like your name company name  "
/>
<SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />


<TextFiledGroup
placeholder=" Company"
name="company"
label="company"
value={this.state.company}
onChange={this.onChange}
error={errors.company}
info="company details"
/>
<TextFiledGroup
placeholder="github"
name="github"
label="github"
value={this.state.github}
onChange={this.onChange}
error={errors.github}
info="If you want your latest repos and a Github link, include your Githubusername"
/>
<TextFiledGroup
                  placeholder="website"
                  name="website"
                  label="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="company website"
                />
<TextFiledGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFiledGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
               

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                <button type="button"className="btn btn-light" onClick={()=>{
                  this.setState(prevState=>({

                    displaySocialInputs:!prevState.displaySocialInputs

                  }))
                  
                  }}>Add socila network link</button>

                  <span className="text-muted">Optional</span>
                </div>
{socialInputs} 
<input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
</form>

 </div>    
    </div>
     </div>    
      </div>
    )
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProsps =state=>({

profile:state.profile,
errors:state.errors

})

export default connect(mapStateToProsps,{createProfile,getCurrentProfile})(withRouter(CreateProfile))
