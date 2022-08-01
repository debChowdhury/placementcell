const Courses = require('../models/courses');

//controller for showing the home page and creating the 3 default courses if they are not in the database
module.exports.home = function(req, res){
    Courses.findOne({name:'DSA'},function(err, row){
        if(!row){
            Courses.create({name:'DSA'}, function(err){
                Courses.findOne({name:'WebD'},function(err, row){
                    if(!row){
                        Courses.create({name:'WebD'}, function(err){
                            Courses.findOne({name:'React'},function(err, row){
                                if(!row){
                                    Courses.create({name:'React'});
                                }
                            });
                        });
                    }
                    
                });
            });
        }
        
        
    });
    
    
    res.render('home',{
        'title': 'Home'
    })   
}