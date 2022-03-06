var express = require('express');
var router = express.Router();
var UserData = require('../Models/userData');

/* GET users listing. */
router.get('/', function(req, res) {
  UserData.find({}, (err, userData) => {
    if(err) {
      console.log(err);
    } else {
      res.render('register', {
        title:'Register',
        userData: userData, 
        style: '/stylesheets/style.css',
        style2: '/stylesheets/register.css',
        emptyStatus: false
      });
    }
  });
});

router.post('/', function(req, res) {
  var userData = new UserData();
  userData.name = req.body.name;
  userData.number = req.body.number;
  userData.password = req.body.password;

  // checking if input enter by user is empty or not
  if(req.body.name === '' || req.body.number === '' || req.body.password === '') {
    res.render('register', {
      title:'Userdata from Database',
      userData: userData, 
      style: '/stylesheets/style.css',
      style2: '/stylesheets/register.css',
      emptyStatus: true
    });
  } else {
    //saving user info to database
    userData.save((err) => {
      if(err) {
        console.log(err);
      } else {
        res.redirect('../login');
      }
    });
  }
});


module.exports = router;
