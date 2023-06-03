
const mongoose = require('mongoose');

const authData = mongoose.Schema({
  userMail:{type:String, require:true,unique:true},
  userName:{ type: String, required: true },
  userPassword:{type: String, required: true },
  userPhoto:{type:String},
}, { versionKey:false});

const authModel = mongoose.model('authInfo', authData);
module.exports = authModel;