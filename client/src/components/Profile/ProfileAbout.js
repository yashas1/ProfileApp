import React, { Component } from 'react'
import isEmpty from"../../validation/is_Empty"
import PropTypes from 'prop-types';
 class ProfileAbout extends Component {
  
    render() {
      
        const {profile}=this.props;
       
        const firstName = profile.user.name;
        const skills = profile.skills.map((skill, index) => (
            <div key={index} className="p-3">
              <i className="fa bg-info fa-check" /> {skill}
            </div>
        ))
        return (
            <div>
            <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
            </div>
        )
    }
}


ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileAbout