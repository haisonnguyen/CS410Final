// require('dotenv').config();

const snoowrap = require('snoowrap');
const moment = require('moment');

// anytime you request ANYTHING from reddit please use await
module.exports = {
  run: run
}

async function run(desired){

const r = new snoowrap({
  userAgent: 'scraper',
  clientId: "BwU0WnuK8201AQ",
  clientSecret: "hwttan89eHOYV3w8qaeZ2Me10Ic",
  username: "FlimsyInterest",
  password: "haihai123"
});

// Grabs subreddit by name
const sub = r.getSubreddit('funny');
var result;

if(desired == "top"){
// Grabs top posts
  result = await sub.getTop();
}
else if(desired == "hot"){
  result = await sub.getHot();
}
else if(desired == "new"){
  result = await sub.getNew();

}
else if(desired =="controversial"){
  result = await sub.getControversial();

}
else if(desired == "rising"){
  result = await sub.getRising();
}
else 
  return ;

// Grabs first post
const first = result[0];
var body = {};

if(first.media) {
  body.vidurl = first.media.reddit_video.fallback_url;
}

body.title = first.title;
body.ups = first.ups;
body.permalink = first.permalink;
body.url = first.url;
body.created_utc = first.created_utc;
body.author = "/u/" + first.author.name;
body.moment = moment.unix(first.created_utc).format('MMMM Do YYYY, h:mm:ss a');
var jzon = JSON.stringify( body);
return body
}



 // Build Snoowrap and client
// const r = new snoowrap({
//   userAgent: 'scraper',
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   username: process.env.REDDIT_USER,
//   password: process.env.REDDIT_PASS
// });
