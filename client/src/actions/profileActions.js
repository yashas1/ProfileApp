import axios from 'axios';
import {GET_PROFILE,PROFILE_LOADING,GET_ERRORS,CLEAR_CURRRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES} from "./types";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get('/api/profile')
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: {}
        })
      );
  };


  export const addEducation=(eduData,history)=>dispatch=>{
   
    axios.post("/api/profile/education",eduData)
    .then(res=>history.push("/dashboard"))
    .catch(err=>
      dispatch({
       type:GET_ERRORS,
       payload:err.response.data
  
      })
      
      )
  
  
    }





  export const addExpirence=(expData,history)=>dispatch=>{
   


  axios.post("/api/profile/exprience",expData)
  .then(res=>history.push("/dashboard"))
  .catch(err=>
    dispatch({
     type:GET_ERRORS,
     payload:err.response.data

    })
    
    )


  }


 export const deletExprience=(id)=>dispatch=>{
  axios
  .delete(`/api/profile/exprience/${id}`)
  .then(res=>{
    
   dispatch({
     type:GET_PROFILE,
     payload:res.data

   })

  })
  .catch(err=>
    dispatch({
     type:GET_ERRORS,
     payload:err.response.data

    })
    
    )

 }



 export const deletEducation=(id)=>dispatch=>{
  axios
  .delete(`/api/profile/education/${id}`)
  .then(res=>{
    
   dispatch({
     type:GET_PROFILE,
     payload:res.data

   })

  })
  .catch(err=>
    dispatch({
     type:GET_ERRORS,
     payload:err.response.data

    })
    
    )

 }


  export const deletAccount=()=>dispatch =>{
   
    if(window.confirm("Are you sure ?You want to Delet the Profile")){

      axios.delete('/api/profile')
      .then(res=>
        dispatch({
         type:SET_CURRENT_USER,
         payload: {}

        })

      )
      .catch(err=>
        dispatch({
          type:GET_ERRORS,
          payload:err.response.data
        }))
    }
  }

  export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile/', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
  
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const getProfiles =()=>dispatch=>{
  dispatch(setProfileLoading());
  axios.get("api/profile/all")
  .then(res=>
    dispatch({
      type:GET_PROFILES,
      payload:res.data

    })
    
    
    )
    .catch(err=>{
      dispatch({

      type:GET_PROFILES,
      payload:null

      })

    })


}

export const getProfileByHandle=(handle)=>dispatch=>{
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
  .then(res=>
    dispatch({
      type:GET_PROFILE,
      payload:res.data

    })
    
    
    )
    .catch(err=>{
      dispatch({
      type:GET_PROFILE,
      payload:null

      })

    })


}



  export const setProfileLoading = () => {
    return {
      type: PROFILE_LOADING
    };
  };
  
  
  export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRRENT_PROFILE
    };
  };