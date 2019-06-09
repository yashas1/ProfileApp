import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import { registerUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import TextFieldGroup from "../common/TextFieldGroup"
class Register extends Component {
constructor(){
super();
this.state={
name:'',
email:'',
password:'',
password2:'',
errors:{}

}

}


componentDidMount(){
  if (this.props.auth.isAuthenticated){

   this.props.history.push("/dashboard")
  }

 }
componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
  }
}
onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit=e=>{
      e.preventDefault();
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
      this.props.registerUser(newUser,this.props.history);
  }
 
  render() {
    const {errors}=this.state;
    
    return (
       <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup placeholder="Enter your name" name ="name" 
            type="Name" 
            value={this.state.name} 
            onChange={this.onChange}
            error={errors.name}
            />
              
            <TextFieldGroup placeholder="Enter your Email" name ="email" 
            type="Email Address" 
            value={this.state.email} 
            onChange={this.onChange}
            error={errors.email} 
            info={"This site uses Gravatar so if you want a profile image, use a Gravatar email"}
            />

  <div className="form-group">
    {/* <label >Password </label> */}
    <input type="password" name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange} className={classnames("form-control", {'is-invalid':errors.password})}   placeholder="Enter password" />
                  {errors.password &&(<div className="invalid-feedback">{errors.password}</div>)}
                
  </div>

      <div className="form-group">            
    {/* <label >Password2 </label> */}
    <input type="password" name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange} className={classnames("form-control", {'is-invalid':errors.password2})}  aria-describedby="emailHelp" placeholder="Re enterpassword" />
                  {errors.password2 &&(<div className="invalid-feedback">{errors.password2}</div>)}
                  </div>         
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
        
  


        
      </div>
      
    )
  }
}


Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));