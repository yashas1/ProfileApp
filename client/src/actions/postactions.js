import axios from 'axios'

import {
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    POST_LOADING,
    DELET_POST,
    GET_POST,
    CLEAR_ERRORS
}from './types'

export  const addpost =postData =>dispatch=>{
    dispatch(clearErrors());
    axios
    .post("/api/post",postData)
    .then(res=>{
     dispatch({
    type:ADD_POST,
    payload:res.data
     })

    })
    .catch(err=>{
        
        dispatch({
         type:GET_ERRORS,
         payload:err.response.data

        })
    })
}



export  const deletpost =id =>dispatch=>{

    axios
    .delete(`/api/post/${id}`)
    .then(res=>{
     dispatch({
    type:DELET_POST,
    payload:id
     })

    })
    .catch(err=>{
        
        dispatch({
         type:GET_ERRORS,
         payload:err.response.data

        })
    })
}



export  const addlike =id =>dispatch=>{

    axios
    .post(`/api/post/likes/${id}`)
    .then(res=>{
     dispatch(getpost())

    })
    .catch(err=>{
        dispatch({
         type:GET_ERRORS,
         payload:err.response.data

        })
    })
}



export  const removelike =id =>dispatch=>{
  axios
    .post(`/api/post/unlike/${id}`)
    .then(res=>{
     dispatch(getpost())

    })
    .catch(err=>{
        dispatch({
         type:GET_ERRORS,
         payload:err.response.data

        })
    })
}
export  const getpost =() =>dispatch=>{
  dispatch(setpostloading());
    axios
    .get("/api/post/")
    .then(res=>{
     dispatch({
    type:GET_POSTS,
    payload:res.data
     })

    })
    .catch(err=>{
        
        dispatch({
         type:GET_POSTS,
         payload:null

        })
    })
}



export  const getPostt =id =>dispatch=>{
    dispatch(setpostloading());
    axios
      .get(`/api/post/${id}`)
      .then(res =>{
        
        dispatch({
          type: GET_POST,
          payload: res.data
        })}
      )
      .catch(err =>{
        
        dispatch({
          type: GET_POST,
          payload: null
        })}
      );
  };

  export  const addComment =(postId,commentData) =>dispatch=>{
 dispatch(clearErrors());
    axios
    .post(`/api/post/comment/${postId}`,commentData)
    .then(res=>{
     dispatch({
    type:GET_POST,
    payload:res.data
     })

    })
    .catch(err=>{
        
        dispatch({
         type:GET_ERRORS,
         payload:err.response.data

        })
    })
}


export  const deletComment =(postId,commentId) =>dispatch=>{

    axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then(res=>{
     dispatch({
    type:GET_POST,
    payload:res.data
     })

    })
    .catch(err=>{
        
        dispatch({
         type:GET_ERRORS,
         payload:err.response.data

        })
    })
}


export const clearErrors =()=>{
    return{
      type:CLEAR_ERRORS
    }
}





export const setpostloading=()=>{
return{
    type:POST_LOADING
}

}