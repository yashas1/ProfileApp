

import React, { Component } from 'react'
import {connect} from "react-redux"
import {deletComment} from "../../actions/postactions"
 class CommentItems extends Component {
   
   onDeleteClick(postId,commentId){
     this.props.deletComment(postId,commentId)

   }
   
    render() {


        const {comment,postId,auth}=this.props;

        return (
            <div>
            <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="/profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this,postId,comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
            </div>
        )
    }
}


const mapStateToPros =state=>({
auth:state.auth

})

export default  connect(mapStateToPros,{deletComment})(CommentItems);