import{ADD_POST,GET_POSTS,POST_LOADING, DELET_POST,GET_POST} from "../actions/types"

const inistalState={
posts:[],
post:[],
loading:false

}

export default function(state=inistalState,action){
switch(action.type){


    case ADD_POST:
   return{
       ...state,
       posts:[action.payload,...state.posts]

   }
   case POST_LOADING:
       return{
         ...state,
         loading:true
       }
   case GET_POSTS:
   return{
       ...state,
       posts:action.payload,
       loading:false

   }

   case GET_POST:
   return{
       ...state,
       post:action.payload,
       loading:false
   }
   case DELET_POST:
       
   return{
       
       ...state,
       posts:state.posts.filter(post=>post._id!==action.payload)
       

   }


    default:
        return state;
}

}