var express = require('express');
var router = express.Router();
var ProblemData = require('../Models/problemLocation');
var UserData = require('../Models/userData');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, (new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname));
  }
})

var upload = multer({storage: storage});

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('index', { 
    title: 'Main Tenant', 
    style:'/stylesheets/style.css', 
    script:'/javascripts/index.js',
    loginStatus: false,
    loginName: 'Login'
  });
});


router.post('/lookup', upload.single('problem_image'), function(req, res) {
  // saving a lng and lat in one object as an array....
  lat = Number(req.body.latitude);
  lng = Number(req.body.longitude);
  location = [lng, lat];
  
  var problemData = new ProblemData();
  problemData.problemType = req.body.problem_type;
  problemData.image = req.file.path.substring(6);
  problemData.location.type = 'Point';
  problemData.location.coordinates = location;
  //problemData.location = {types: 'Point', location: location};
  problemData.save((err) => {
    if(err) {
      console.log(err);
    } else {
      res.render('lookup', {
        title: 'look problem',
        style: '/stylesheets/style.css',
        style2: '/stylesheets/lookup.css',
        script: '/javascripts/lookup.js',
        lat: problemData.location.coordinates[1],
        lng: problemData.location.coordinates[0],
        problemImage: problemData.image.replace(/\\/g, '/'),
        problemType: problemData.problemType,
        uploadTimeLoad: true
      });
    }
  })
})

module.exports = router;
