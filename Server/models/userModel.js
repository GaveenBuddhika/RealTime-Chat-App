const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

username : {
    type : String,
    required : true,
    unique : true
},

email : {
    type : String,
    required : true,
    unique : true
},

password : {
    type : String,
    required : true
},

isAvatarImageset : {
    type : Boolean,
    default : false
},

isAvatarImages : {
    type : String,
    default : ""
}







});

module.exports= mongoose.model("Users", userSchema);
