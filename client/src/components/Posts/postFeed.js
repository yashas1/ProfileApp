import React, { Component } from 'react'
import PostItem from './postItem'
 class PostFeed extends Component {


    render() {
        const {posts} =this.props
        return  posts.map(post=><PostItem key={post._id} post={post}/>)
    }
}

export default PostFeed;