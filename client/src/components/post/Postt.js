import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deletpost} from '../../actions/postactions'
import {getPostt} from '../../actions/postactions'
import PostItem from '../Posts/postItem'
import {Link} from"react-router-dom"
import spinner from "../../images/lg.ajax-spinner-gif.gif";
import CommentForm from './CommentForm'
import CommentFeed from "./CommentFeed"
 class Postt extends Component {

componentDidMount(){
this.props.getPostt(this.props.match.params.id);

    }
    render() {

        const {post,loading}=this.props.post;
        
        let postContent;
        if(post==null ||loading||Object.keys(post).length===0){
           postContent= <img src={spinner}style={{ width: '200px', margin: 'auto', display: 'block' }}
           alt="Loading..." ></img>

        }
        else
        {
            postContent=(
                <div>

                    <PostItem post={post} showActions={false}/>
                    <CommentForm postId={post._id}/>
                    <CommentFeed  postId={post._id} comments={post.comments} />
                </div>
            )
        }
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div  className="col-md-10">
                              <Link to="/feed" className="btn btn-info mt-3 mb-3">back to feed</Link>
                              {postContent}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    post: state.post
  });
  
  export default connect(mapStateToProps, { getPostt })(Postt);
  