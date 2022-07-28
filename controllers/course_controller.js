const mongoose = require('mongoose');
const Students = require('../models/students');
const Batches = require('../models/batches');
const Courses = require('../models/courses');
const CoursesScore = require('../models/courses_score');
const Interviews = require('../models/interviews');
const AssignInterviewsStatus = require('../models/assign_interviews_status');

module.exports.addCourse = function(req, res){
    res.render('add_course',{
        'title': 'Add course'
    })
}

module.exports.createCourse = function(req, res){
    Courses.findOne({name:req.body.name}, function(err, course){
        if(err){
            console.log(err);
            res.json({'status':'error','msg':'Error in creating course'});
        }
        if(!course){
            Courses.create({
                name: req.body.name
            }, function(err, data){
                if(err){
                    console.log(err);
                    res.json({'status':'error','msg':'Error in creating course'});
                }
                res.json({'status':'success','msg':'Successfully created course','data':data});
            });
        }
        else{
            res.json({'status':'error','msg':'Course already created'});
        }
    });
    
}

module.exports.courseList = function(req, res){
    Courses.find({}, function(err, courses){
        if(err){
            return console.log(err);
        }
        res.render('course_list',{
            'title': 'Course list',
            'courses': courses
        })
    });
}