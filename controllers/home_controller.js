module.exports.home = function(req, res){
    res.render('home',{
        'title': 'Very good',
        'body' : 'Body here'
    })
}