import React, { Component } from 'react'
import {connect} from 'react-redux';
import{withRouter} from "react-router-dom";
import  Moment from  "react-moment"
import {deletEducation} from "../../actions/profileActions"
 class Education extends Component {


 onDeleteClick=(id)=>{

   this.props.deletEducation(id)

 }


  
  render() {
     
  const education= this.props.education.map(edu=>(
   <tr key={edu._id}>
   <td>{edu.school}</td>
    <td>{edu.degree}</td>
    <td><Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}</td>
    <td><button
            onClick={this.onDeleteClick.bind(this,edu._id)}
            className="btn btn-danger"
          > Delete
          </button></td>    
   </tr>

  ))


    return (
      <div>
       <h4 className="mb-4">Education Details</h4> 
       <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    )
  }
}
 

 
    export default connect(null,{deletEducation})(withRouter(Education));   