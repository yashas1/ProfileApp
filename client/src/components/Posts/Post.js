import React, { Component } from 'react'
import{connect} from 'react-redux';
import PostForm from "./PostForm"
import {getpost} from "../../actions/postactions"
import spinner from "../../images/lg.ajax-spinner-gif.gif";
import PostFedd from"./postFeed"
import {Link} from 'react-router-dom'
 class Post extends Component {

componentDidMount(){
this.props.getpost()
    
}

    render() {
        const{posts,loading}=this.props.post;
        let postContent;
        if(posts==null||loading){
              postContent=<img src={spinner}style={{ width: '200px', margin: 'auto', display: 'block' }}
              alt="Loading..." ></img>

        }
        else
        { 
            
          postContent=<PostFedd posts={posts}/>

        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                    <Link to="/dashboard" className="btn btn-info btn-sm mt-3 mb-3 float-left">Back To Dashboard</Link>
                      <div className="col-md-12">

                      <PostForm />
                           {postContent}
                      </div>


                         
                    </div>



                </div>
                
            </div>
        )
    }
}

const mapstatetoprops= state=>({
post:state.post

})


export default connect(mapstatetoprops,{getpost}) (Post);