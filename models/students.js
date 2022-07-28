const mongoose = require('mongoose');
const { Schema } = mongoose;
const studentsSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true,
        ref: 'Batches' 
    },
    status:{
        type: String,
        required: true
    }
},{
    timestamps:true
}); 
const User = mongoose.model('Students', studentsSchema);
module.exports = User;