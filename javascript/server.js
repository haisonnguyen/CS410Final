// handlers server requests

var express = require('express');
var bd = require('./scrape.js');
var mustache = require('mustache');
var server = express();
var fs = require('fs');
var jQuery = require('jquery');

server.use(express.static(__dirname));

var text = "lit";

// grabs the "template" from index.html for rendering :)
fs.readFile("../templates/displaytemplate.html", function (err, html) {
  if (err) console.log(err);
  console.log("Finished reading template");
  text = html.toString('utf8');
});

server.get('/', (req, res) => {
  res.writeHeader(200, { "Content-Type": "text/html" });
  res.write(text);
  res.end();
});

// serve hot
server.get('/hot', async (req, res) => {

  // grabs object data to display from scrape.js
  var str = await bd.run(req.url.slice(1));

  res.set('Content-Type', 'text/html');
  res.write(mustache.render(text, str));
  res.end();
});

// serve new
server.get('/new', async (req, res) => {

  // grabs object data to display from scrape.js
  var str = await bd.run(req.url.slice(1));

  res.set('Content-Type', 'text/html');
  res.write(mustache.render(text, str));
  res.end();
});

// serve controversial
server.get('/controversial', async (req, res) => {

  console.log(req.url.slice(1))
  // grabs object data to display from scrape.js
  var str = await bd.run(req.url.slice(1));

  res.set('Content-Type', 'text/html');
  res.write(mustache.render(text, str));
  res.end();
});

// serve top
server.get('/top', async (req, res) => {

  // grabs object data to display from scrape.js
  var str = await bd.run(req.url.slice(1));

  res.set('Content-Type', 'text/html');
  res.write(mustache.render(text, str));
  res.end();
});

// serve rising
server.get('/rising', async (req, res) => {

  // grabs object data to display from scrape.js
  var str = await bd.run(req.url.slice(1));

  res.set('Content-Type', 'text/html');
  res.write(mustache.render(text, str));
  res.end();
});

server.listen(process.env.PORT || 8080);