const mongoose = require('mongoose');

const authData = mongoose.Schema({
  email:{type:String},
  OTP:{ type: String},
  status:{type:Number, default:0 },
  createDate:{type:Date, default:Date.now()}
 
}, { versionKey:false});

const OTPModel = mongoose.model('OTPInfo', authData);
module.exports = OTPModel;