var express = require('express');
const https = require('http');
var router = express.Router();

/* GET player stats. */
router.get('/:team/:name', function(req, res, next) {
  const options = {
    hostname: 'flask-ss-heroku.herokuapp.com',
    path: '/players/?name=' + encodeURIComponent(req.params.name) + '&team=' + encodeURIComponent(req.params.team),
    method: 'GET'
  }
  const playerReq = https.request(options, (playerRes) => {
    // On response
    var response = '';
    playerRes.on('data', (d) => {
      response += d.toString();
    })

    playerRes.on('end', () => {
      // Parses GET response into JSON object data
      var data = JSON.parse(response);
      res.render('player', {title: 'Second String', data: data});
    })
  })
  
  playerReq.on('error', (error) => {
    console.error(error);
  })
  
  playerReq.end()
});

module.exports = router;
