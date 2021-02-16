// require router from express
const router=require('express').Router();

//Require the Profile Schema
const Profile=require('../models/Profile');


// Route Post api/
router.post('/inscription', async(req, res)=>{
    const{name, lastName, birthDate}=req.body;

    try {
         //simple volidation
         if(!name || !lastName || !birthDate){
            return res.status(400).json({msg:'Please enter all parameter'});
        
        }
//create new Profile
profile=new Profile({name, lastName, birthDate});
    
    //save the profile
    await profile.save();
    res.status(200).send({msg:'profile creacted with success', profile});
} 
catch (error) {
    res.status(500).send({msg:"server Error"})
}
});

router.get("/allprofile",async(req,res)=>{
    try {
       const profile= await Profile.find()
       res.json({msg:"profile show", profile})
    } catch (error) {console.log(error);
        
    }
 });
 router.put("/editprofile/:_id", async (req, res)=>{
    const _id=req.params.id;
    try {
        const editprofile=await Profile.findOneAndUpdate({id:_id},{$set:req.body})
        res.json({msg:"profile edited", editprofile});
    } catch (error) { console.log(error)}

})

//delete
router.delete("/deleteprofile/:_id", async(req,res)=>{    
    const {_id}=req.params;
try {
const profile=await Profile.findOneAndDelete(_id);
res.json({msg:"profile is deleted", profile})
    } catch (error) {
        console.log(error)
    
}
}
)

module.exports=router