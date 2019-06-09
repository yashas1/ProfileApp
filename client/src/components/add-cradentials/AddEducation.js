import React, { Component } from 'react'
import {Link,withRouter} from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profileActions'
 class AddEducation extends Component {
     constructor(props){
         super(props)
         this.state={
          
            school:"",
            degree:"",
            branch:"",
            from:"",
            to:"",
            current:false,
            description:'',
            errors:{},
            disabled:false           

         }
         
         
     }

componentWillReceiveProps(nextprops){
if(nextprops){

  this.setState({
   errors:nextprops.errors
}


)

}
}

 onSubmit=(e)=>{
     e.preventDefault();
     const eduData={
       school : this.state.school,
       branch: this.state.branch,
      degree: this.state.degree,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description

     }
     
     
    this.props.addEducation(eduData, this.props.history);
 }

 onChange=(e)=>{
  this.setState({
  [e.target.name]:e.target.value
 }
 )
}
oncheck=(e)=>{
   this.setState({
    disabled: !this.state.disabled,
    current: !this.state.current

   })

 }
     

  render() {
      const {errors}=this.state;
    return (
      <div className="add-exprience">
          <div className="container">
          <div  className="row ">
              <div className="col-md-8 m-auto">

                  <Link to="/dashboard" className="btn  btn-sm btn-info mt-2">Go back</Link>
               <h1 className='display-4 text-center'>Add Education</h1>
               <p className="lead text-center">Add all of your Education details</p>
<small className="d-block pb-3">*Means Required Fields</small>
<form onSubmit={this.onSubmit}>
<TextFieldGroup
                  placeholder="* school"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup
                  placeholder="* Branch"
                  name="branch"
                  value={this.state.branch}
                  onChange={this.onChange}
                  error={errors.branch}
                />
                <TextFieldGroup
                  placeholder="Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                    <input 
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.oncheck}
                    id="current"></input>
                    <label htmlFor="current" className="form-check-label">If still Studying</label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Education Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the the position"
                />
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



const mapStateToProps= state=>({

profile:state.profile,
errors:state.errors

})

    export default connect(mapStateToProps,{addEducation}) (withRouter(AddEducation));