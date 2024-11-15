const { Router } = require("express");
const User = require("../models/user");
const multer=require("multer")
const path=require("path")


const router = Router(); 


const storage=multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,path.resolve(`./public/useruploads`))
  }
  ,
  filename:function(req,file,cb){
      const filename=`${Date.now()}-${file.originalname}`
      cb(null,filename)
  }
})
const upload=multer({storage:storage})



router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

  try {

    const user = await User.findOne({ email }); 
    res.locals.user = user;
  
    const token = await User.matchpass(email, password);
 
    return res.cookie("token",token).redirect("/");
  } catch (error) {
    return res.render("signin",{
      error:"Incorrect email passoword"
    })
    
  }
});

router.post('/signup', upload.single("profileImageURL"), async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);
  console.log("myyy", req.file);

  try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.render('signup', { errorMessage: "User already exists" });
      }

      // Create a new user if not found
      await User.create({
          fullname,
          email,
          password,
          profileImageURL: `/useruploads/${req.file.filename}`
      });

      return res.redirect("/");
  } catch (error) {
      console.error("Error during signup:", error);
      return res.render('signup', { errorMessage: "An error occurred during signup" });
  }
});


 
router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/")
})

module.exports = router;
