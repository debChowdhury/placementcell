const mongoose = require('mongoose');
const coursesScoreSchema = new mongoose.Schema({
    studentId:{
        type: String,
        required: true,
        unique: false,
        ref: 'Students'
    },
    courseId:{
        type: String,
        required: true,
        ref: 'Courses'
    },
    courseScore:{
        type: String
    }
    
},{
    timestamps:true
}); 
const CoursesScore = mongoose.model('Courses_Score', coursesScoreSchema);
module.exports = CoursesScore;