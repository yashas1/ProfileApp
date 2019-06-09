const mongoose = require("mongoose");
const schema = mongoose.Schema;
const profileSchema =new schema({
user:{
type:schema.Types.ObjectId,
ref:'users'
},
handle:{
type:String,
required:true,
max:40

},
company:{
type:String
},
website:{
type:String
},
location:{
    type:String
},
status:{
    type:String,
    required:true
},
skills:{
type:[String],
required:true

},
github:{
    type:String
},
bio:{
    type:String
},
experience:[
{
        title:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        location:{
            type:String,
            
        },
        from:{
            type:Date,
            requird:true
        },
        to:{
            type:Date
        },
        current:{
            type:Boolean,
            default:false
        },
        description:{
            type:String
        }
}

],

education:[{
    
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            branch:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                requird:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }  
          }
    
        ],

social:{
youtube:{
    type:String
},
facebook:{
    type:String
},
instagram:{
    type:String
},
twitter:{
    type:String
},
linkedin:{
    type:String
}

},

date:{
    type:Date,
    default:Date.now
}

})

module.exports=profiles=mongoose.model("profiles",profileSchema);