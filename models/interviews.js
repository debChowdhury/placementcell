const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    company_name:{
        type: String,
        required: true
    },
    interview_date:{
        type: String,
        required: true
    }
    
},{
    timestamps:true
}); 
const model = mongoose.model('Interviews', schema);
module.exports = model;