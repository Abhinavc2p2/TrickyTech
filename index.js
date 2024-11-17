require('dotenv').config();
const express= require("express")
const path=require("path")
const userroute=require("./routes/user")
const blogrouter=require("./routes/blog")
const mongoose=require("mongoose")
const user=require("./models/user")
const cookieparser=require("cookie-parser")

const Blog=require("./models/blog")
const { checkforautentication } = require("./middlewares/authentication")

mongoose.connect(process.env.MONGO_URL ).then((e)=>{
    console.log("mongodb connected")
})

const app=express();
const PORT=process.env.PORT || 8000;

app.set('view engine',"ejs")
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())
app.use(checkforautentication("token"))
app.use(express.static(path.resolve('./public')))

app.get("/", async( req,res)=>{
    const allblogs=await Blog.find({})
    res.render("Home",{
        user:req.user,
        blogs:allblogs
    })
   
   
})


app.use("/user",userroute)
app.use("/blog",blogrouter)

app.listen(PORT,()=>{
    console.log("SERVR RUNNING ON PORT"+`${PORT}`)
})