// require('dotenv').config();

const snoowrap = require('snoowrap');
const moment = require('moment');
const express = require('express');

var server = express();

server.get('/', (req, res)=> {
  res.set('Content-Type', 'text/html');
  res.status(200).send("<!DOCTYPE html><html><body>Welcome</body></html>");
})
server.get('/top', (req, res) => {

  res.set('Content-Type', 'text/html');
  res.status(200).send("<!DOCTYPE html><html><body>lorem ipsom</body></html>");
});

server.listen(process.env.PORT || 8080);













// anytime you request ANYTHING from reddit please use await
async function run(){

const r = new snoowrap({
  userAgent: 'scraper',
  clientId: "BwU0WnuK8201AQ",
  clientSecret: "hwttan89eHOYV3w8qaeZ2Me10Ic",
  username: "FlimsyInterest",
  password: "haihai123"
});

// Grabs subreddit by name
const sub = r.getSubreddit('funny');
// Grabs top posts
const top = await sub.getTop();
// Grabs first post
const first = top[0];

var body = {};

body.title = first.title;
body.ups = first.ups;
body.permalink = first.permalink;
body.url = first.url;
body.created_utc = first.created_utc;
body.author = first.author.name;
body.moment = moment.unix(first.created_utc).format('MMMM Do YYYY, h:mm:ss a');

var jzon = JSON.stringify( body);
console.log(body);
console.log("------------");

}

// run().catch(console.error);


 // Build Snoowrap and client
// const r = new snoowrap({
//   userAgent: 'scraper',
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   username: process.env.REDDIT_USER,
//   password: process.env.REDDIT_PASS
// });
