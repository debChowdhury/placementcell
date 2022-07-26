const mongoose = require('mongoose');
//schema for courses model
const coursesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
    
},{
    timestamps:true
}); 
const Courses = mongoose.model('Courses', coursesSchema);


module.exports = Courses;