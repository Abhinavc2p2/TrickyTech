const {Schema,model} =require("mongoose");

const commentschem= new Schema({
    content:{
        type:String,
        required:true
    },
    blogid:{
          type:Schema.Types.ObjectId,
        ref:"blog"

    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestapms:true})

const Comment=model("comment",commentschem)

module.exports=Comment