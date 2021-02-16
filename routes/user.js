// require router from express
const router=require('express').Router();
// require bcript
const bcrypt = require('bcrypt');
// require jsonwebtoken
const jwt=require("jsonwebtoken");

//Require the User Schema
const User=require('../models/User');

const isAuth=require('../middlewares/isAuth');

/*const {
    validator,
     registerRules, 
     loginRules,}
    =require("../middlewares/validator")*/

    
    

// Route Post api/
router.post('/register', async(req, res)=>{
    const{name, lastName, email, password}=req.body;

    try {
            
        //simple volidation
        if(!name || !lastName || !email || !password)
            {
            return res.status(400).json({msg:'Please enter all fiels'});
        }
        
        //check for existing user
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"})
        }
        
        //create new User
    user=new User({name, lastName, email, password});
    // creacte salt & hsch 
     const salt=10;
    const hashedPassword= await bcrypt.hash(password, salt);
    user.password=hashedPassword;
   
    //save the user 
    await user.save();
    // sign user 
    const payload={id:user._id};
    const token= await jwt.sign(payload, process.env.secretOrKey,{
        expiresIn: '9 days',
      });

    res.status(200).send({msg:'User is registred', user})
    } 
    catch (error) {
        res.status(500).send({msg:"server Error"})
    }
});
router.get("/all",async(req,res)=>{
    try {
       const contacts= await User.find()
       res.json({msg:"data mentionned", contacts})
    } catch (error) {console.log(error);
        
    }
 });

1// check login user 
router.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try {
        // simple validation
        if(!email ||!password){
            return res.status(400).send({msg:"please enter all fiels"});
        }
        // check existing user 
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).send({msg:'Bad Credentials! email'});
                }
         // check password
const isMatch= await bcrypt.compare(password, user.password);
if (!isMatch){
    return res.status(400).send({msg:'Bad Credentials! password'})
}
 // sign user 
 const payload={id:user._id};
const token= await jwt.sign(payload, process.env.secretOrKey);
 
res.send({msg:"logged with success", user,token});
    }catch (error) {
        console.log(error)
            res.status(500).send({msg:"server Error"})
        
    }
});
// process private
router.get('/user', isAuth, (req, res) => {
    res.status(200).send({ user: req.user });
  });

//delete
router.delete("/delete/:_id", async(req,res)=>{    
    const {_id}=req.params;
    try {
const userToDelete= await User.findOneAndDelete({_id});
res.json({msg:"User is deleted", userToDelete})
    } catch (error) {
        console.log(error)
    
}
}
)
  

module.exports=router; 
