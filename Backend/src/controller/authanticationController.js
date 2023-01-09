const { sendCookie } = require("../Utility/sendCookie");
const user = require("../models/user");
const jwt = require("jsonwebtoken");


//search functionality--------------------------------------
module.exports.login = async (req, res) => {
  const { user_id, password } = req.body;

  // check both field are exist or not
  if (!(user_id || password)) {
    return res
      .status(500)
      .json({ success: false, message: "user_id and password are required" });
  }

  //fetch data from database
  const User = await user.findOne({ user_id }).select("+password");
  if (!User) {
    res.status(400).json({ success: false, message: "email is not registerd" });
    return false;
  }

  //validate password  
  if (User.password === password) {
    console.log({_id:User._id, user_id:User.user_id})
    const token=jwt.sign({_id:User._id, user_id:User.user_id},process.env.JWT_SIGN);
    console.log(token)
    sendCookie(User,token,res, "Login success") // token send as cookie and json

  } else {
    res.status(400).json({
      success: false,
      message: "email or password does not match or exist",
    });
  }
};


//logout==========================================================
module.exports.logout = async (req, res) => {
  const { token } = req.cookies;
 
  if (!token) {
    res.status(401).json({ success: false, message: "already logged out" });
  } else {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout success" });
  }
};


//User logged in or not ====================================================================================================
module.exports.isAuthanticated = async (req, res) => {
  console.log("isauth calling")
    const {user}=req;
  if (!user) {
    return res.status(501).json({ success: false, message: "user not logged in !" });
  } 
    res
      .status(200)
      .json({ success: true, message: "you are already loggedin", user });
  }
