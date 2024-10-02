const{createHmac,randomBytes}=require('crypto')
const {Schema,model} =require("mongoose");
const { createtokenforuser } = require('../services/authentication');

const userSchema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    profileImageURL:{
        type:String,
        default:"/images/default.png"
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},{timestamps:true})


userSchema.pre("save",function(next){
    const user=this;

    if(!user.isModified("password")) return;
    const salt=randomBytes(16).toString()

    const hashpassword=createHmac('sha256',salt).update(user.password).digest("hex")

    this.salt=salt;
    this.password=hashpassword;

    next()


})
userSchema.static('matchpass', async function(email,password){
    const user= await this.findOne({email});
    if(!user) throw new Error('User not Found!');

    const salt=user.salt;
    const hashedpassword=user.password;

    const userprovidedhash=createHmac("sha256",salt).update(password).digest("hex");
    if(hashedpassword !== userprovidedhash) throw new Error('Incorrect password')

    const token=createtokenforuser(user)
    return token;
})
const User=model("users",userSchema)

module.exports=User;
