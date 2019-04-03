var express = require('express');
const https = require('https')
var router = express.Router();

// Sets options to QB route on flask backend
const options = {
  hostname: 'flask-ss-heroku.herokuapp.com',
  path: '/players/QB/',
  method: 'GET'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // Requests QB data
  const qbReq = https.request(options, (qbRes) => {
    // On response
    qbRes.on('data', (d) => {
      // Parses GET response into JSON object data
      var data = JSON.parse(d.toString());
      // Renders stat page with data object
      res.render('index', { title: 'Second String', data: data });
    })
  })
  
  qbReq.on('error', (error) => {
    console.error(error)
  })
  
  qbReq.end()
});

module.exports = router;
