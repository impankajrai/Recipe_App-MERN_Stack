const user = require("../models/user");
const jwt = require("jsonwebtoken");


module.exports.userAuth= async(req,res,next)=>{
    console.log("miuddleware calling")
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({success:false, message: 'Please login first'})
        }
        
        const {data}=jwt.verify(token,process.env.JWT_SIGN,(error,data)=>{
            if(error){
                return {error}
            }
            return {data}
        }) 
    
        
        if(!data){
            return res.status(401).json({success:false, message: 'invalid user'})
        }
        //user check in database
        const DBuser=await user.findOne({_id:data._id,user_id:data.user_id})
        console.log("USer=>",DBuser)
        if (DBuser._id && DBuser.user_id) {
            req.user=DBuser
            next()
        }else{
            return res.status(401).json({success:false, message: 'invalid user'})
        }
    }


