import axios from 'axios';
import {GET_ERRORS} from './types'
import setAuthtoke from '../utils/setAuthtoken';
import jwt_decode from 'jwt-decode'
import {SET_CURRENT_USER} from './types'

export const registerUser =(userData,history)=>dispatch=>{

    axios.post('/api/users/register',userData)
    .then(res=>history.push('/login'))
    .catch(err=>
        dispatch({
        type:GET_ERRORS,
        payload:err.response.data

        })

        )}

export const loginUser =userData =>dispatch =>{
axios.post('/api/users/login',userData)
.then( res=>{
    const {token}= res.data;

localStorage.setItem('jwtToken',token);

setAuthtoke(token);

const decode =jwt_decode(token);
dispatch(setCurrentUser(decode));

})
.catch(
    err=>
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data

        })
)
};


export const setCurrentUser =(decode)=>{
return {
type:SET_CURRENT_USER,
payload:decode

}

}


export const logoutUser = ()=>dispatch =>{
localStorage.removeItem('jwtToken');

setAuthtoke(false);

dispatch(setCurrentUser({}))



}