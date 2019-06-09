import React, { Component } from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import classnames from 'classnames';
import {deletpost,addlike,removelike} from "../../actions/postactions"
class PostItem extends Component { 
    onDeleteClick=(id)=> {
        this.props.deletpost(id);
      }
      
      onLikeClick =(id)=>{
       this.props.addlike(id)

      }

      onUnLikeClick =(id)=>{
        this.props.removelike(id)
 
       }
       findUserlike=(likes)=>{
         
         const {auth}=this.props;
         const sup=likes.filter(like => like.user == auth.user.id)
        


         if(sup.length > 0){
           
            
           return true;
              
         }
         else{

            return false;
         }
         
        
       }

    render() {
        const {auth,post,showActions}=this.props;
        return (
            <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            
              {showActions?(<span>
                <button
                  onClick={()=>{this.onLikeClick(post._id)}}
                  type="button"
                  className="btn btn-light mr-1"
                >
                <i className={classnames('fas fa-thumbs-up',{
                    'text-success':this.findUserlike(post.likes)
                })}></i>
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={()=>{this.onUnLikeClick(post._id)}}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={()=>{this.onDeleteClick(post._id)}}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>):null}
            
          </div>
        </div>
      </div>
        )
    }
}

PostItem.defaultProps={
showActions:true

}

const mapStateProps =state=>({

    auth:state.auth
})
export default connect(mapStateProps,{deletpost,addlike,removelike}) (PostItem);