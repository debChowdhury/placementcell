const mongoose = require('mongoose');
const Students = require('../models/students');
const Batches = require('../models/batches');
const Courses = require('../models/courses');
const CoursesScore = require('../models/courses_score');
const Interviews = require('../models/interviews');
const AssignInterviewsStatus = require('../models/assign_interviews_status');

module.exports.addInterview = function(req, res){
    res.render('add_interview',{
        'title': 'Add interview'
    })
}

module.exports.createInterviews = function(req, res){
    Interviews.findOne({company_name:req.body.company_name, interview_date: req.body.interview_date}, function(err, row){
        if(err){
            console.log(err);
            res.json({'status':'error','msg':'Error in creating interview'});
        }
        if(!row){
            Interviews.create({company_name:req.body.company_name, interview_date: req.body.interview_date},
                 function(err, data){
                if(err){
                    console.log(err);
                    res.json({'status':'error','msg':'Error in creating interview'});
                }
                res.json({'status':'success','msg':'Successfully inserted interview','data':data});
            });
        }
        else{
            res.json({'status':'error','msg':'Interview with given company and date already present'});
        }
    });
    
}

module.exports.interviewList = function(req, res){
    Interviews.find({}, function(err, interviews){
        if(err){
            return console.log(err);
        }
        res.render('interview_list',{
            'title': 'Interview list',
            'interviews': interviews
        })
    });   
}