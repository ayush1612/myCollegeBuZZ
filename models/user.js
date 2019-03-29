var mongoose  = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:   String,
    email:String,
    isAdmin:{type:Boolean,default:false},
    college:String,
    password:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model("User",UserSchema);