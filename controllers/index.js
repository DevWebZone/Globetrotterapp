const User =  require('../models/user');
const Score =  require('../models/score');
const helper = require('../config/helper');
module.exports.login = function(req, res){
    if(req.query.ref && req.query.score){
        let ref = req.query.ref;
        let score = req.query.score;
        return res.render("login", {
            title : "Login Page",
            loginError : "",
            registerError : "",
            ref: ref,
            score: score
        });
    }
    return res.render("login", {
        title : "Login Page",
        loginError : "",
        registerError : "",
        ref: "",
        score:""
    });  
    
}

module.exports.home = async function(req, res){
    if(req.cookies.user){
        let lastScore = await Score.findOne({user: req.cookies.user._id});
        console.log(lastScore);
        const destination = helper.getDestination();
        return res.render("home", {
            title : "home",
            destination,
            lastScore
        });
    }
    else
        return res.redirect('/');
}
module.exports.playAgain = async function(req, res){
    if(req.cookies.user){
        let lastScore = await Score.findOne({user: req.cookies.user._id});
        lastScore.CorrectAnswer = 0;
        lastScore.IncorrectAnswer = 0;
        lastScore.save();
        return res.redirect('/home');
    }
    else
        return res.redirect('/');
}
module.exports.checkAnswer = async function(req, res){
    try {
        let city =  req.query.city;
        //let answer = $(`#${req.query.id}`).val();
        let isCorrect = helper.checkAnswer(city);
        return res.json(200,  {
            message: "Request Successful",
            data: {
                isCorrect: isCorrect
            }
        })
    } catch (error) {
        
    }
}
module.exports.updateScore = async function(req, res){
    try {
        let correct =  parseInt(req.query.correct);
        
        let incorrect =  parseInt(req.query.incorrect);
        
        let lastScore = await Score.findOne({user: req.cookies.user._id});
        if(lastScore){
            lastScore.CorrectAnswer = correct;
            lastScore.IncorrectAnswer = incorrect;
            lastScore.save();
            
            return res.json(200,  {
                message: "Score Updated Successfully",
            });
        }
        return res.json(500,  {
            message: "Score not found"
        });
    } catch (error) {
        return res.json(500,  {
            message: "Internal Server Error"
        });
    }
}
module.exports.randomImage = async function(req, res){
    try {
        let city =  req.query.city;
        //let answer = $(`#${req.query.id}`).val();
        let isCorrect = helper.checkAnswer(city);
        return res.json(200,  {
            message: "Request Successful",
            data: {
                isCorrect: isCorrect
            }
        })
    } catch (error) {
        
    }
}
module.exports.Invite = async function(req, res){
    try {
        if(req.cookies.user){
            let lastScore = await Score.findOne({user: req.cookies.user._id});
            let appUrl = req.protocol + '://' + req.get('host');
            console.log("Application URL: ", appUrl);
            appUrl = appUrl + `/?ref=${req.cookies.user.name}&score=${lastScore.CorrectAnswer}`;
            return res.json(200,  {
                message: "Request Successful",
                data: {
                    appUrl: appUrl
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.json(500,  {
            message: error
        });
    }
}
module.exports.signup = async function(req, res){
    try 
    {
        let user =  await User.findOne({name: req.body.username});
        
        console.log(user);
        if(!user){

            let newUser = await User.create({
                                name: req.body.username
                            });
            let newScore = await Score.create({
                user: newUser._id,
                CorrectAnswer: 0,
                IncorrectAnswer: 0
            });
            console.log(newUser);
            if (req.cookies.user) {
                res.clearCookie('user');
            }
            res.cookie('user', newUser, { maxAge: 900000, httpOnly: true });

            return res.redirect('/home');
        }
        return res.render('login',{
            title : "Login Page",
            loginError : "",
            registerError : "Username already exists. Please enter a unique name",
            ref: "",
            score:""
        });
    } 
    catch (err) 
    {
        console.log(err);
    }
}
module.exports.signin = async function(req, res){
    try 
    {
        let user =  await User.findOne({name: req.body.username});
        
        console.log(user);
        if(user){
            
            if (req.cookies.user) {
                res.clearCookie('user');
            }
            res.cookie('user', user, { maxAge: 900000, httpOnly: true });
            return res.redirect('/home');
        }
        return res.render('login',{
            title : "Login Page",
            loginError : "Username does not exists. Try again!!",
            registerError : "",
            ref: "",
            score:""
        });
    } 
    catch (err) 
    {
        console.log(err);
    }
}
module.exports.signout = function(req, res, next){ 
        if (req.cookies.user) {
            res.clearCookie('user');
        }
        return res.redirect('/');
}
