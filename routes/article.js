//require router from express
const router = require("express").Router();
const User = require("../models/User")
const multer = require('multer');
const path = require('path'); 
const storage = multer.diskStorage({
  destination: "upload/",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now}${path.extname(file.originalname)}`);
}
});
const fileFilter=(req, file, cb) =>{
  //reject file
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png') {
  cb(null, true);
} else {
  cb(nul, false);
}
}
const upload=multer({storage: storage, limits:{
  fileSize:1024*1024*5
},
fileFilter:fileFilter
});


//Require the Article Schema
const Article = require("../models/Article");
router.post("/article/:_id", upload.single('productImage'), async (req, res) => {
  console.log(req.file);
  const { _id } = req.params;
  try {
    const user = await User.findById(_id).select("-password");
    const newArticle = {
      text: req.body.text,
      name: user.name,
      user: user.id,
      productImage:req.file.path
    };
    const article = await new Article(newArticle).save();
    res.json(article);
  } catch (error) {
    console.log(error)
    res.status(500).json("Server Error !")
  }
});
// get 
router.get("/getArt", async (req, res) => {
  try {
    const allarticle = await Article.find();
    res.json({ msg: "data mentionned", allarticle })
  } catch (error) {
    console.log(error);
  }
});
//edit Article 
router.put("/editarticle/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const editarticle = await Article.findOneAndUpdate({ _id }, { $set: req.body })
    res.json({ msg: "article edited", editarticle });
  } catch (error) { console.log(error) }
})
//delete
router.delete("/deletearticle/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const article = await Article.findOneAndDelete({ _id });
    res.json({ msg: "service is deleted", article })
  } catch (error) {
    console.log(error)
  }
}
)
//add comment
router.put("/newcomment/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const article = await Article.findOneAndUpdate({ _id }, {
      $push: { comments: { comment: req.body.comment, index: req.body.index } }
    });
    res.json(article);
  }
  catch (error) { res.status(500).send("Server Error !"); }
});
// delet comment 
router.put("/deletecomment/:_id/:index", async (req, res) => {
  const { _id } = req.params;
  const { index } = req.body;
  try {
    const newArticle = await Article.findOneAndUpdate({ _id }, {
      $set: { comments: { index } }
    });
    res.json({ msg: "comment delitted", newArticle });
  }
  catch (error) { res.status(500).send("Server Error !"); }
});
//editComment
router.put("/deletecomment/:_id/:comment_id", async (req, res) => {
  const { _id } = req.params;
  const {comment_id } = req.body;
  try {
    const newArticle = await Article.findOneAndUpdate({ _id }, {
      $set: { comments: { comment_id } }
    });
    res.json({ msg: "comment delitted", newArticle });
  }
  catch (error) { res.status(500).send("Server Error !"); }
});
module.exports = router;