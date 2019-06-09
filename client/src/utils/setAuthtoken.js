import axios from 'axios';

const setAuthtoke=token=>{
if(token){

    axios.defaults.headers.common['Authorization']=token;
}
else{

    delete axios.defaults.headers.common['Authoriztion'];
}

}

export default setAuthtoke;