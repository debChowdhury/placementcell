const mongoose = require('mongoose');
const Students = require('../models/students');
const Batches = require('../models/batches');
const Courses = require('../models/courses');
const CoursesScore = require('../models/courses_score');
const Interviews = require('../models/interviews');
const AssignInterviewsStatus = require('../models/assign_interviews_status');

module.exports.addStudent = function(req, res){
    Students.
        find({}).
        populate('batch').
        exec(function (err, students) {
            if(err){
                return console.log(err);
            }
            Courses.find({}, function(err, courses){
                if(err){
                    return console.log(err);
                }
                Batches.find({}, function(err, batches){
                    if(err){
                        return console.log(err);
                    }
                    Interviews.find({}, function(err, interviews){
                        if(err){
                            return console.log(err);
                        }
                        res.render('add_student',{
                            'title': 'Add student',
                            'students': students,
                            'courses': courses,
                            'batches': batches,
                            'interviews': interviews
                        })
                    });
                });
                
            });
        });    
}

module.exports.studentList = function(req, res){
    Students.
        find({}).
        populate('batch').
        exec(function (err, students) {
            if(err){
                return console.log(err);
            }
            res.render('student_list',{
                'title': 'Student list',
                'students': students
            })
        });    
}

module.exports.createStudent = function(req, res){
    Students.findOne({email:req.body.email}, function(err, student){
        if(err){
            console.log(err);
            res.json({'status':'error','msg':'Error in creating student'});
        }
        if(!student){
            Students.create({
                email: req.body.email,
                name: req.body.name,
                college: req.body.college,
                batch: req.body.batch,
                status: req.body.status
            }, function(err, student){
                if(err){
                    console.log(err);
                    res.json({'status':'error','msg':'Error in creating student'});
                }
                else{
                    Students.
                        find().
                        populate('batch').
                        exec(function (err, rows) {
                            if(err){
                                console.log(err);
                                res.json({'status':'error','msg':'Error in fetching students'});
                            }
                            res.json({'status':'success','msg':'Student created successfully','data':rows});
                        });
                    
                    
                }
            });
        }
        else{
            res.json({'status':'error','msg':'Student already created'});
        }
    });
    
}

module.exports.studentScores = function(req, res){
    let studentId = req.params.studentId;
    Students.findById(studentId, function (err, student) {
        if(err){
            console.log(err);
            return console.log('Error in finding student');
        }
        Batches.findById(student.batch, function(err, batch){
            if(err){
                console.log(err);
                return console.log('Error in finding batch');
            }
            Courses.find({}, function(err, courses){
                if(err){
                    console.log(err);
                    return console.log('Error in finding all courses');
                }
                CoursesScore.find({studentId: studentId}, function(err, rows){
                    if(err){
                        console.log(err);
                        return console.log('Error in finding all courses scores');
                    }
                    res.render('student_scores',{
                        'title': 'Student scores',
                        'student': student,
                        'batch': batch,
                        'courses': courses,
                        'courses_scores': rows
                    })
                });
                
            });
        });
    });
}

module.exports.updateScores = function(req, res){
    console.log(req.body);
    let course_score = req.body.course_score;
    let course_id = req.body.course_id;
    let student_id = req.body.student_id;
    CoursesScore.findOne({studentId: student_id, courseId: course_id}, function (err, row) {
        if(err){
            console.log(err);
            res.json({'status': 'error', 'msg':'Error in inserting course score'});
        }
        if(!row){
            CoursesScore.create({studentId: student_id, courseId: course_id, courseScore: course_score}, function(err, row){
                if(err){
                    console.log(err);
                    res.json({'status': 'error', 'msg':'Error in inserting course score'});
                }
                else{
                    res.json({'status': 'success', 'msg':'Successfully inserted course score'});
                }
            });
        }
        else{
            CoursesScore.findOneAndUpdate({studentId: student_id, courseId: course_id},{courseScore: course_score}, function(err, row){
                if(err){
                    console.log(err);
                    res.json({'status': 'error', 'msg':'Error in updating course score'});
                }
                else{
                    res.json({'status': 'success', 'msg':'Successfully updated course score'});
                }
            });
        }
    });
}

module.exports.assignStudentInterviews = function(req, res){
    let interviewId = req.params.interviewId;
    Interviews.findById(interviewId, function (err, interview) {
        if(err){
            console.log(err);
            return console.log('Error in finding interview');
        }
        Students.find({}).populate('batch').exec(function(err, students){
            if(err){
                console.log(err);
                return console.log('Error in finding students');
            }
            AssignInterviewsStatus.find({interview_id:interviewId}, function(err, assignInterviewsStatuses){
                if(err){
                    console.log(err);
                    return console.log('Error in finding assign interviews statuses');
                }
                res.render('assign_student_interviews',{
                    'title': 'Assign student interviews',
                    'students': students,
                    'interview': interview,
                    'assignInterviewStatuses': assignInterviewsStatuses
                })
            });
            
        });
        
    });
}

module.exports.assignStudentInterviewsPost = function(req, res){
    console.log(req.body);
    let interviewId = req.body.interviewId;
    let studentId = req.body.studentId;
    let assignStatus = req.body.assignStatus;
    if(assignStatus == 'true'){
        AssignInterviewsStatus.findOne({student_id: studentId, interview_id:interviewId}, function(err, row){
            if(err){
                console.log(err);
                return console.log('Error in finding assign interviews statuses');
            }
            if(!row){
                AssignInterviewsStatus.create({student_id: studentId, interview_id: interviewId, result_status: ""}, function(err, row){
                    if(err){
                        console.log(err);
                        res.json({'status': 'error', 'msg':'Error'});
                    }
                    else{
                        res.json({'status': 'success', 'msg':'Successfully assigned student to interview'});
                    }
                });
            }
            else{
                res.json({'status': 'error', 'msg':'Already assigned interview to student'});
            }
        });
        
    }
    else{
        AssignInterviewsStatus.findOneAndDelete({student_id: studentId, interview_id: interviewId}, function(err, row){
            if(err){
                console.log(err);
                res.json({'status': 'error', 'msg':'Error'});
            }
            else{
                res.json({'status': 'success', 'msg':'Successfully removed student from interview'});
            }
        });
    }
}

module.exports.studentInterviewStatus = function(req, res){
    console.log(req.params);
    let interviewId = req.params.interviewId;
    let studentId = req.params.studentId;
    AssignInterviewsStatus.findOne({interview_id:interviewId, student_id:studentId})
    .populate({path:'student_id', populate:'batch'}).populate('interview_id').exec(function(err, assignInterviewsStatuses){
        if(err){
            console.log(err);
            return console.log('Error in finding assign interviews statuses');
        }
        console.log("Sdf"+assignInterviewsStatuses);
        res.render('interview_status',{
            'title': 'Interview status',
            'assignInterviewsStatuses': assignInterviewsStatuses
        })
    });
    
}

module.exports.studentInterviewStatusPost = function(req, res){
    console.log(req.body);
    let interviewId = req.body.interviewId;
    let studentInterviewStatus = req.body.studentInterviewStatus;
    AssignInterviewsStatus.findByIdAndUpdate(interviewId,{result_status: studentInterviewStatus}, function(err, row){
        if(err){
            console.log(err);
            res.json({'status': 'error', 'msg':'Error'});
        }
        else{
            console.log(row);
            res.json({'status': 'success', 'msg':'Interview status updated successfully'});
        }
    });
}