// require router from express
const router=require('express').Router();

//Require the Service Schema
const Service=require('../models/Service');


// Route Post api/
router.post('/add', async(req, res)=>{
    const{category,name}=req.body;

    try {
         //simple volidation
         if( !category||!name ){
            return res.status(400).json({msg:'Please enter all parameter'});
        
        }
//create new Service
service=new Service({ category,name });
    
    //save the Service
    await service.save();
    res.status(200).send({msg:'profile creacted with success',service});
} 
catch (error) {
    res.status(500).send({msg:"server Error"})
}
});
//get
router.get("/allservice",async(req,res)=>{
    try {
       const service= await Service.find()
       res.json({msg:"service show", service})
    } catch (error) {console.log(error);
        
    }
 });
//edit
router.put("/editservice/:_id", async (req, res)=>{
    const {_id}=req.params;
    try {
        const editservice=await Service.findOneAndUpdate({_id},{$set:req.body})
        res.json({msg:"service edited", editservice});
    } catch (error) { console.log(error)}

})

//delete
router.delete("/deleteservice/:_id", async(req,res)=>{    
    const {_id}=req.params;
try {
const service=await Service.findOneAndDelete(_id);
res.json({msg:"service is deleted", service})
    } catch (error) {
        console.log(error)
    
}
}
)
module.exports=router