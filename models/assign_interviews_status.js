const mongoose = require('mongoose');
const { Schema } = mongoose;
//schema for assign interview status model
const schema = new mongoose.Schema({
    student_id:{
        type: String,
        required: true,
        ref: 'Students'
    },
    interview_id:{
        type: String,
        required: true,
        ref:'Interviews'
    },
    result_status:{
        type: String
    }
    
},{
    timestamps:true
}); 
const model = mongoose.model('assign_interviews_status', schema);
module.exports = model;