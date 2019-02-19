var express = require('express');
var Router = express.Router();
var request = require('request');
const rootURL = 'https://api.github.com/';


/* GET home page. */

Router.get('/', (req, res) => {
  res.render('index', {userData: null})
})

Router.post('/', (req, res) => { 
  var options = {
    url: rootURL + 'users/' + req.body.username,
    headers: {
      'User-Agent': 'roderickjackson-bradley',
      'Authorization': 'token' + process.env.GITHUB_TOKEN
    }
  }
  request(options, (err, response, body) => {
    var userData = JSON.parse(body);
    options.url = userData.repos_url
    request(options, (err, response, body) => {
      userData.repos = JSON.parse(body)
      // console.log(userData.repos[0])
      res.render('index', {userData: userData})
    })
   
  })
})


module.exports = Router;
