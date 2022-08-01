const Users = require('../models/users');
const CoursesScore = require('../models/courses_score');
const AssignInterviewsStatus = require('../models/assign_interviews_status');
const { Parser } = require('json2csv');

//controller for checking whether any interview is assigned or not to any student
module.exports.anyInterviewsAssignedOrNot = function(req, res){
  AssignInterviewsStatus.find({}, function(err, rows){
    console.log(err);
    console.log(rows);
    if(rows.length == 0){
      res.json({'status':'error', 'msg':'No interview assigned to any student'});
    }
    else{
      res.json({'status':'success'});
    }
  });
};

//controller for downloading csv file consisting of the interview data of a student
module.exports.downloadCsv = function(req, res){
  CoursesScore.find({}).populate('courseId').exec(function(err, scores){
    console.log(scores);
    AssignInterviewsStatus.find({}).populate('student_id').populate('interview_id').exec(function(err, rows){
      
      let dataJsonArr = [];
      for(i of rows){
        let dsaScore = '';
        let webDScore = '';
        let reactScore = '';
        if (scores.some(e => e.studentId === i.student_id.id && e.courseId.name === 'DSA')) {
          dsaScore = scores.find(e => e.studentId === i.student_id.id && e.courseId.name === 'DSA').courseScore;
        }
        if (scores.some(e => e.studentId === i.student_id.id && e.courseId.name === 'WebD')) {
          webDScore = scores.find(e => e.studentId === i.student_id.id && e.courseId.name === 'WebD').courseScore;
        }
        if (scores.some(e => e.studentId === i.student_id.id && e.courseId.name === 'React')) {
          reactScore = scores.find(e => e.studentId === i.student_id.id && e.courseId.name === 'React').courseScore;
        }
        let dataJsonObj = {
          "Student id": i.student_id.id,
          "Student name": i.student_id.name,
          "Student college": i.student_id.college,
          "Student status": i.student_id.status,
          "DSA final score": dsaScore,
          "WebD final score": webDScore,
          "React final score": reactScore,
          "Interview date": i.interview_id.interview_date,
          "Interview company": i.interview_id.company_name,
          "Interview student result": i.result_status
        };
        dataJsonArr.push(dataJsonObj);
      }
      const fields = ['Student id', 'Student name', 'Student college', 'Student status', "DSA final score", "WebD final score", "React final score",
      "Interview date", "Interview company", "Interview student result"]; 
      const json2csvParser = new Parser({fields, defaultValue : "NA", includeEmptyRows : true});
      const csv = json2csvParser.parse(dataJsonArr);
      res.setHeader('Content-disposition', 'attachment; filename=data.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    });
  });
}

//controller for showing the user sign in page
module.exports.signIn = function(req, res){
  res.render('user_sign_in',{
      title: 'Sign in'
  });
}

//controller for showing the user sign up page
module.exports.signUp = function(req, res){
  res.render('user_sign_up',{
      title: 'Sign up'
  });
}

//controller for signing up
module.exports.signUpAction = function(req, res){
  console.log(req.body);
  Users.findOne({email:req.body.email}, function(err, user){
    if(err){
      console.log(err);
      res.json({'status':'error', 'msg':'Error in signing up'});
    }
    else if(user){
      res.json({'status':'error', 'msg':'User already registered'});
    }
    else{
      Users.create( {email: req.body.email, password: req.body.password} , function (err, user) {
        if(err){
          console.log(err);
          res.json({'status':'error', 'msg':'Error in signing up'});
        }
        else{
          var user = {
            id: user.id,
            email: user.email
          };
          req.login(user, function(err) {
            if(err){
              console.log(err);
              res.json({'status':'error', 'msg':'Error in signing up'});
            }
            else{
              res.json({'status':'success', 'msg':'User registered and logging in'});
            }
            
          });
        }
        
      });
    }

  });
  
  
}

//controller for signing in which is used in conjuction with passport local login strategy
module.exports.createSession = function(req, res){
    return res.redirect('/home');
}