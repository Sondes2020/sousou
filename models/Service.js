1//rquire mongoose
const mongoose=require("mongoose");
2// require Shema
const Schema=mongoose.Schema;

3// create service Schema
const ServiceSchema=new Schema({

   category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    
    
})
module.exports=Service=mongoose.model('Service', ServiceSchema);