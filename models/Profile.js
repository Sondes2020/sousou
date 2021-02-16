1//rquire mongoose
const mongoose=require("mongoose");
2// require Shema
const Schema=mongoose.Schema;

3// create profileShema
const ProfileSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    birthDate:{
        type:Date,
        required:true,
       
    },
   
   
})
module.exports=Profile=mongoose.model('Profile', ProfileSchema);