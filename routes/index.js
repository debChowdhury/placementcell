const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');
const studentsController = require('../controllers/student_controller');
const batchController = require('../controllers/batch_controller');
const courseController = require('../controllers/course_controller');
const interviewController = require('../controllers/interview_controller');
const passport = require('passport');

//all the routes of the app and their middlewares and corresponding controllers
router.get('/', passport.checkAuthenticationForSignInAndSignUp, usersController.signIn);
router.get('/home', passport.checkAuthentication,  homeController.home);
router.get('/signup', passport.checkAuthenticationForSignInAndSignUp, usersController.signUp);
router.post('/signup', usersController.signUpAction);
router.post('/createSession', passport.authenticate(
    'local',{   
        successRedirect: '/home',
        failureRedirect: '/'
    }
));
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});
router.post('/create-student', studentsController.createStudent);
router.post('/create-interviews', interviewController.createInterviews);
router.post('/create-batch', batchController.createBatch);
router.post('/create-course', courseController.createCourse);
router.get('/student-scores/:studentId', passport.checkAuthentication, studentsController.studentScores);
router.get('/download-csv', passport.checkAuthentication, usersController.downloadCsv);
router.get('/assign-student-interviews/:interviewId', passport.checkAuthentication, studentsController.assignStudentInterviews);
router.post('/assign-student-interviews', studentsController.assignStudentInterviewsPost);
router.post('/update-scores', studentsController.updateScores);
router.get('/interview-status/:interviewId/:studentId', passport.checkAuthentication, studentsController.studentInterviewStatus);
router.post('/interview-status', studentsController.studentInterviewStatusPost);
router.get('/add-batch', passport.checkAuthentication, batchController.addBatch);
router.get('/add-course', passport.checkAuthentication, courseController.addCourse);
router.get('/add-student', passport.checkAuthentication, studentsController.addStudent);
router.get('/add-interview', passport.checkAuthentication, interviewController.addInterview);
router.get('/course-list', passport.checkAuthentication, courseController.courseList);
router.get('/batch-list', passport.checkAuthentication, batchController.batchList);
router.get('/student-list', passport.checkAuthentication, studentsController.studentList);
router.get('/interview-list', passport.checkAuthentication, interviewController.interviewList);
router.get('/get-all-assigned-interviews', passport.checkAuthentication, usersController.anyInterviewsAssignedOrNot);
module.exports = router;