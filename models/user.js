var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: String,
	firstname: String,
	lastname: String,
	email: { type: String, required: true, unique: true},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	isAdmin: { type: Boolean , default: false }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);