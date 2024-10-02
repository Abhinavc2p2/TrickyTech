const { Schema, model} = require("mongoose");

const blogschema = new Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true,
  },
  coverimage:{
    type: String,
  },
 createdby:{
  type:Schema.Types.ObjectId,
  ref:"users"

 }
},{ timestamps:true});

const Blog=model("blog", blogschema);

module.exports=Blog;
