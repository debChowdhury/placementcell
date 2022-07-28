const mongoose = require('mongoose');
const Students = require('../models/students');
const Batches = require('../models/batches');
const Courses = require('../models/courses');
const CoursesScore = require('../models/courses_score');
const Interviews = require('../models/interviews');
const AssignInterviewsStatus = require('../models/assign_interviews_status');

module.exports.addBatch = function(req, res){
    res.render('add_batch',{
        'title': 'Add batch'
    })
}

module.exports.createBatch = function(req, res){
    Batches.findOne({name:req.body.name}, function(err, batch){
        if(err){
            console.log(err);
            res.json({'status':'error','msg':'Error in creating batch'});
        }
        if(!batch){
            Batches.create({
                name: req.body.name
            }, function(err, batch){
                if(err){
                    console.log(err);
                    res.json({'status':'error','msg':'Error in creating batch'});
                }
                Batches.find({}, function(err, batches){
                    if(err){
                        console.log(err);
                        res.json({'status':'error','msg':'Error in finding batches'});
                    }
                    res.json({'status':'success','msg':'Successfully created batch', 'data':batches});
                });
                
            });
        }
        else{
            res.json({'status':'error','msg':'Batch already created'});
        }
    });
    
}

module.exports.batchList = function(req, res){
    Batches.find({}, function(err, rows){
        if(err){
            return console.log(err);
        }
        res.render('batch_list',{
            'title': 'Batch list',
            'batches': rows
        })
    });
}