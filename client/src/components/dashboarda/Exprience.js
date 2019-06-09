import React, { Component } from 'react'
import {connect} from 'react-redux';
import{withRouter} from "react-router-dom";
import  Moment from  "react-moment"
import {deletExprience} from "../../actions/profileActions"
 class Exprience extends Component {


 onDeleteClick=(id)=>{

   this.props.deletExprience(id)

 }


  
  render() {
      
  const exprience= this.props.exprience.map(exp=>(
   <tr >
   <td>{exp.company}</td>
    <td>{exp.title}</td>
    <td><Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}</td>
    <td><button
            onClick={this.onDeleteClick.bind(this,exp._id)}
            className="btn btn-danger"
          > Delete
          </button></td>    
   </tr>

  ))


    return (
      <div>
       <h4 className="mb-4">Exprience Credentials</h4> 
       <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {exprience}
          </thead>
        </table>
      </div>
    )
  }
}
 

export default connect(null,{deletExprience})(withRouter(Exprience));   