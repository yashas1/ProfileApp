import React, { Component } from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types'
import {connect } from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from "../common//TextFieldGroup";
 class login extends Component {

  constructor(){
   super();

   this.state={
    
    email:'',
    password:'',
    errors:{}

   }


  }

  componentDidMount(){
   if (this.props.auth.isAuthenticated){

    this.props.history.push("/dashboard")
   }

  }

componentWillReceiveProps(nextProps){
if(nextProps.auth.isAuthenticated){
this.props.history.push('/dashboard');

}

if(nextProps.errors){

  this.setState({errors:nextProps.errors});
}

}

  onChange=(e)=>{

  this.setState({
    [e.target.name]:e.target.value
  })

  }

  onSubmit=(e)=>{
    e.preventDefault();
    const userData = {
     
      email: this.state.email,
      password: this.state.password,
     
    };

    this.props.loginUser(userData);
    
}



  render() {
const {errors} =this.state;

    return (
     <div>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">
                Login to your DevConnector account
              </p>
              <form  onSubmit={this.onSubmit}>
              
            <TextFieldGroup placeholder="Enter Email Address" 
            name ="email" 
            type="Email Address" 
            vlaue={this.state.email} 
            onChange={this.onChange}
            error={errors.email
            }/>
           <TextFieldGroup placeholder="Enter password" 
            name ="password" 
            type="Password" vlaue={this.state.password} 
            onChange={this.onChange}
            error={errors.password}
            />     
            
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
        
  


        
      </div>
      </div> 
    )
  }
}

login.propTypes={
loginUser: propTypes.func.isRequired,
auth: propTypes.object.isRequired,
errors: propTypes.object.isRequired 

}

const mapStateprops =(state)=>({
auth:state.auth,
errors:state.errors

})

export default connect(mapStateprops,{loginUser})(login);
