// handlers server requests

var express = require('express');
var bd = require('./scrape.js');
var mustache = require('mustache');
var server = express();
var fs = require('fs');

server.use(express.static(__dirname));

var template;

// grabs the "template" from index.html for rendering :)
fs.readFile("../../templates/displaytemplate.html", function (err, html) {
  if (err)
    console.log(err);

  console.log("Finished reading template");
  template = html.toString('utf8');
});

server.get("/:param", async (req, res) => {
  // returns array
  var str = await bd.run(req.params.param);

  if (str) {
    // passed in from scrape.js, parse JSON obj to render as the view for the template
    str = await JSON.parse(str);
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(mustache.render(template, str));
    res.end();
  }
  else {
    res.writeHeader(400, { "Content-Type": "text/html" });
    res.write("404 Not found");
    res.end();
  }
});

server.get('/', async (req, res) => {
  var str = await bd.run("hot");

  if (str) {
    str = await JSON.parse(str);
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(mustache.render(template, str));
    res.end();
  }
  else {
    res.writeHeader(400, { "Content-Type": "text/html" });
    res.write("404 Not found");
    res.end();
  }
  res.end();
});

server.listen(process.env.PORT || 8080, () => {
  console.log("http://localhost:8080/")
});