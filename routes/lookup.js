var express = require('express');
var router = express.Router();
var ProblemData = require('../Models/problemLocation');
var userData = require('../Models/userData');
var id = '5d31faab12b06d12c85a4cdd';

router.get('/', function(req, res) {
    ProblemData.find({}, (err, problemData) => {
        if(err) {
            console.log(err);
        } else {
            var problem = [];
            for(var i=0; i<problemData.length; i++) {
                problem[i] = {
                    problemType: problemData[i].problemType,
                    problemImage: problemData[i].image.replace(/\\/g, '/'),
                    lat: problemData[i].location.coordinates[1],
                    lng: problemData[i].location.coordinates[0]
                }
            }
            res.render('lookup', {
                title: 'look problem',
                style: '/stylesheets/style.css',
                style2: '/stylesheets/lookup.css',
                script: '/javascripts/lookup.js',
                point: problem
            });
        }
    })
})

module.exports = router;