var express = require('express');
var router = express.Router();
var UserData = require('../Models/userData');


router.get('/', function(req, res) {
    
    res.render('login', {
        title: 'login',
        style: '/stylesheets/style.css',
        style2: '/stylesheets/login.css',
        message: 'this is login page',
        authentic: false,
        emptyStatus: false
    })
});

router.post('/', function(req, res) {

    if(req.body.number === '' || req.body.password === '') {
        res.render('login', {
            title: 'login',
            style: '/stylesheets/style.css',
            style2: '/stylesheets/login.css',
            message: 'this is login page',
            emptyStatus: true
        })
    } else {
        UserData.find({}, (err, userData) => {
            var nack;
            var authentic = false;
    
            for(var i=0; i<userData.length; i++) {
                if(userData[i].number === Number(req.body.number) && userData[i].password === req.body.password) {
                    res.render('index', {
                        title: 'Main Tenant', 
                        style:'/stylesheets/style.css', 
                        script:'/javascripts/index.js',
                        loginName: `Hi! ${userData[i].name}`,
                        loginStatus: true
                    })
                    authentic = true;
                }
            }
            if(authentic !== true) {
                res.render('login', {
                    title: 'login',
                    style: '/stylesheets/style.css',
                    style2: '/stylesheets/login.css',
                    nack: 'Number or Password is Wrong',
                    authentic: true
                })
            }
        })
    }

    
})

module.exports = router;