const { validatetoken } = require("../services/authentication")

function checkforautentication(cookiename){
    return (req,res,next)=>{
        const tokencookivalue=req.cookies[cookiename]
        // console.log(tokencookivalue)
        if(!tokencookivalue){
           return   next()
        }

       try {
        const userpayload=validatetoken(tokencookivalue)
        req.user=userpayload;
       } catch (error) { }
  return   next();
    }
}

module.exports=
{
    checkforautentication
}