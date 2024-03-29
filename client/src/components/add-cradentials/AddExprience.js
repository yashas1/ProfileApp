import React, { Component } from 'react'
import {Link,withRouter} from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {addExpirence} from '../../actions/profileActions'
 class AddExprience extends Component {
     constructor(props){
         super(props)
         this.state={
          
            company:"",
            title:"",
            location:"",
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
     const expData={
       company : this.state.company,
       title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description

     }
     
     
    this.props.addExpirence(expData, this.props.history);
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
          <div  className="row">
              <div className="col-md-8 m-auto">

                  <Link to="/dashboard" className="btn btn-sm btn-info mt-2">Go back</Link>
               <h1 className='display-4 text-center'>Add Expirence</h1>
               <p className="lead text-center">Add any job are postion that you have had in the past or current</p>
<small className="d-block pb-3">*Means Required Fields</small>
<form onSubmit={this.onSubmit}>
<TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
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
                    <label htmlFor="current" className="form-check-label">current Job</label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
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


export default connect(mapStateToProps,{addExpirence}) (withRouter(AddExprience));