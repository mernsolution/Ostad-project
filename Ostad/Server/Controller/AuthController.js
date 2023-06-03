const authModel = require("../Model/AuthModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const OTPModel =require("../Model/OTPModel");
const SendEmailUtility = require("../Utility/SendMailUtility");


// exports.register = async(req, res) => {
//   const { userName, userPassword ,userMail, userPhoto} = req.body;
  
//   if (!userName || !userPassword || !userMail){
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//      const hashpassword = await bcrypt.hash(userPassword, 5);
//     const userData = await authModel.create({ userName,userMail,userPhoto, userPassword:hashpassword }); 
//     res.status(200).json({ message: "Data created successfully", data: userData });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to create data", error: error });
//   }
// };

exports.register = async(req, res) => {
  const reqBody = req.body;
  try {  
    const userData = await authModel.create(reqBody); 
    res.status(200).json({ message: "Data created successfully", data: userData });
  } catch (error) {
    res.status(400).json({ message: "Failed to create data", error: error });
  }
};
// exports.userLogin= async(req,res)=>{
//   const { userPassword,userMail} =req.body;
// try{
//   const user = await authModel.findOne({userMail});
//   if(!user){
//    return res.status(400).json('Submits your valid email')
//   }
//   const checkPassword= await bcrypt.compare(userPassword, user.userPassword)
//   if(!checkPassword){
//    return res.status(400).json('password don"t match');
//   }
 
//   const payload = {exp:Math.floor(Date.now()/1000)+ 24 *60 *60 , data:user.userMail }
//   const token = jwt.sign(payload, 'sdowyruituoreyt74hdjgf');
//   res.status(200).json({massage:"Login successfully", token:token, data:user})

// }catch (error) {
//   console.log(error)
// }
// }
exports.userLogin = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await authModel.aggregate([
      { $match: reqBody },
      { $project: {
        _id: 0,
        userMail: 1,
        userName: 1,
        userPassword: 1,
        userPhoto: 1,
      }},
    ]);
    if (data.length > 0) {
      const payload = { 
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        data: data[0].userMail,
      };
      const token = jwt.sign(payload, 'secretKey123456789');
      res.status(200).json({ status: 'success', token: token, data: data[0] });
    } else {
      res.status(401).json({ status: 'unauthorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: 'fail', data: err });
  }
};
//userprofile data update 
exports.update= async(req,res)=>{
  const email=req.headers['userMail'];
  const userEmail={userMail:email};
  const reqBody = req.body;
try {
  const updateData = await authModel.updateOne(userEmail,reqBody)
  res.status(200).json({message:"update successfully", data:updateData})
} catch (error) {
  res.status(400).json({message:"update field", error:error})
}
}
//get profile data from database for update
exports.getUserDetails= async(req,res)=>{
try {
  const userMail = req.headers['userMail']
  const data =await authModel.aggregate([
      { $match:{userMail:userMail}},
  {$project:{_id:1,userName:1, userMail:1, userPhoto:1, userPassword:1} }
  ])
       res.status(200).json({status:"successfully",data:data}) 
        
  } catch (error) {
      res.status(400).json({status:'faield', error:error})
}
}


// exports.RecoverVerifyEmail = async(req,res)=>{
// const email = req.params.email;
// const OTPCode = Math.floor(100000 + Math.random() * 900000)
// try {
//   const UserCount =  (await authModel.aggregate([{$match:{userMail:email}},{$count:'total'}]))
// if(UserCount.length>0){
//    const CreateOTP = await OTPModel.create({email:email, Otp:OTPCode})
//   const SendEmail = await SendEmailUtility(email,'Your OTP code is :'+ OTPCode, "OTP verification Code")
//   console.log(SendEmail)
// res.status(200).json({status:"success", data:SendEmail})
// }else{
//   res.status(400).json({status:"User Not Found", data:SendEmail})
// }
// }catch (error) {
//   res.status(400).json({status:"failed", error:error})
// }
// }
exports.RecoverVerifyEmail = async (req, res) => {
  const email = req.params.email;
  const OTPCode = Math.floor(100000 + Math.random() * 900000);

  try {
    // Check if the user exists
    const UserCount = await authModel.aggregate([
      { $match: { userMail: email } },
      { $count: "total" },
    ]);

    if (UserCount.length > 0) {
      // Create OTP record in the database
      const CreateOTP = await OTPModel.create({ email: email, OTP: OTPCode });

      // Send OTP code to the user
      const SendEmail = await SendEmailUtility(
        email,
        `Your OTP code is: ${OTPCode}`,
        "OTP verification Code"
      );

      res.status(200).json({ status: "success", message: "OTP code sent" });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to send OTP code" });
  }
};


exports.RecoverVerifyOTP = async (req, res) => {
  const email = req.params.email;
  const OTPCode = req.params.otp;
  const status = 0;
  const statusUpdate = 1;
  try {
    const OtpCount = await OTPModel.aggregate([
      { $match: {email: email, OTP:OTPCode, status: status } },
      { $count: 'total' },
    ]);
    if (OtpCount.length>0) {
      const OTPUpdate = await OTPModel.updateOne(
        { email: email, OTP: OTPCode, status: status },
        { email: email, OTP: OTPCode, status: statusUpdate }
      );
      res.status(200).json({ status: 'success', data: OTPUpdate });
    } else {
      res.status(400).json({ status: 'failed', data: 'Invalid OTP code' });
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', data: error });
  }
};

exports.RecoverRestPassword = async(req,res)=>{
  const email = req.body['email'];
  const OTPCode = req.body['OTP'];
  const NewPass =  req.body['password'];
  const statusUpdate=1;
  try {
    const OTPUsedCount = await OTPModel.aggregate([{$match: {email: email, OTP: OTPCode, status: statusUpdate}}, {$count: "total"}])
    if (OTPUsedCount.length>0) {
        const PassUpdate = await authModel.updateOne({userMail:email}, {
          userPassword: NewPass
        })
        res.status(200).json({status: "success", data: PassUpdate})
    } else {
        res.status(400).json({status: "fail", data: "Invalid Request"})
    }
}
catch (e) {
    res.status(400).json({status: "fail", data:e})
}
}
