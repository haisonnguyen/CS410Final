// handlers server requests

var express = require('express');
var bd = require('./scrape.js');
var mustache = require('mustache');
var server = express();
var fs = require('fs');

server.use(express.static(__dirname));


var template = "lit";
var postData;

// grabs the "template" from index.html for rendering :)
fs.readFile("../templates/displaytemplate.html", function (err, html) {
  if (err) console.log(err);
  console.log("Finished reading template");
  template = html.toString('utf8');
});

fs.readFile("../templates/postTemplate.html", (err, html) => {
  if (err) console.log(err);
  console.log("Finished reading template");
  postData = html.toString('utf8');
});

server.get("/:param", async (req, res) => {
  // returns array
  var str = await bd.run(req.params.param);
  if (str) {
    var numEntries = str.length;
    for (var i = 0; i < numEntries; ++i) {
      template = template.slice(0, template.indexOf("</ul>")) + postData + template.slice(template.indexOf("</ul>"));
      console.log(template);
    }

    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(mustache.render(template, JSON.stringify(str)));
    res.end();
  }
  else {
    res.writeHeader(400, { "Content-Type": "text/html" });
    res.write("Not found");
    res.end();
  }
});

server.get('/', (req, res) => {
  res.writeHeader(200, { "Content-Type": "text/html" });
  res.write(template);
  res.end();
});

// // serve hot
// server.get('/hot', async (req, res) => {

//   // grabs object data to display from scrape.js
//   var str = await bd.run(req.url.slice(1));

//   res.set('Content-Type', 'text/html');
//   res.write(mustache.render(template, str));
//   res.end();
// });

// // serve new
// server.get('/new', async (req, res) => {

//   // grabs object data to display from scrape.js
//   var str = await bd.run(req.url.slice(1));

//   res.set('Content-Type', 'text/html');
//   res.write(mustache.render(template, str));
//   res.end();
// });

// // serve controversial
// server.get('/controversial', async (req, res) => {

//  // console.log(req.url.slice(1))
//   // grabs object data to display from scrape.js
//   var str = await bd.run(req.url.slice(1));

//   res.set('Content-Type', 'text/html');
//   res.write(mustache.render(template, str));
//   res.end();
// });

// // serve top
// server.get('/top', async (req, res) => {

//   // grabs object data to display from scrape.js
//   var str = await bd.run(req.url.slice(1));

//   res.set('Content-Type', 'text/html');
//   res.write(mustache.render(template, str));
//   res.end();
// });

// // serve rising
// server.get('/rising', async (req, res) => {

//   // grabs object data to display from scrape.js
//   var str = await bd.run(req.url.slice(1));

//   res.set('Content-Type', 'text/html');
//   res.write(mustache.render(template, str));
//   res.end();
// });

server.listen(process.env.PORT || 8080);

