var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var jwt = require('jsonwebtoken');
var server = app.listen(8081);
var User = require(__dirname + '/server/models/user.js');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Orgin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Request-With,content-type,\Authorization');
    next();
});

mongoose.connect('mongodb://mongo:27017/myappdatabase', {
    useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function (callback) {
    console.log('MONGO: successfully connected to db');
});

app.use(express.static(__dirname + '/public'));

var apiRoutes = require(__dirname + '/server/routes/api')(app,express);
app.use('/api',apiRoutes);


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.post('/authenticate',function(req, res){
    User.findOne({
        username: req.body.username
    }).select('name username password').exec(function(err,user){
        if(err) throw err;
        if(!user){
            res.json({
                success:false,
                message:'Authencation failed. User not found.'
            });
        }else if (user){
            var validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success: false,
                    message: 'Authencation failed. Wrong password.'
                });
            }else{
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, 'Secert' , {
                    expiresIn: 86400
                });
                res.json({
                    name: user.name,
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

app.route('/register')
    .post(function(req,res) {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function(err){
            if (err){
                if(err.code == 11000)
                    return res.json({success: false,
                        message: 'A user with that\ username already exists.'});
                else
                    return res.send(err);
            }
            res.json({ message:'User created!' });
        });
    });

console.log("Listening on 9090");