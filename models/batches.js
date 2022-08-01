const mongoose = require('mongoose');
//schema for batches model
const batchesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    
},{
    timestamps:true
}); 
const Batch = mongoose.model('Batches', batchesSchema);
module.exports = Batch;