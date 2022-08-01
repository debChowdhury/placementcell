const mongoose = require('mongoose');
//schema for user model
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
}); 
const User = mongoose.model('User', userSchema);
module.exports = User;