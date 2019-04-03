var express = require('express');
const https = require('http');
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
    var response = '';
    qbRes.on('data', (d) => {
      response += d.toString();
    })
    
    qbRes.on('end', () => {
      // Parses GET response into JSON object datas
      var data = JSON.parse(response);
      res.render('index', { title: 'Second String', data: data});
    })
  })
  
  qbReq.on('error', (error) => {
    console.error(error)
  })
  
  qbReq.end()
});

module.exports = router;
