// require('dotenv').config();

const snoowrap = require('snoowrap');
const moment = require('moment');

// anytime you request ANYTHING from reddit please use await
module.exports = {
  run: run
}

async function run(desired) {

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

  if (desired == "top") {
    // Grabs top posts
    result = await sub.getTop({ limit: 3 });
  }
  else if (desired == "hot") {
    result = await sub.getHot({ limit: 3 });
  }
  else if (desired == "new") {
    result = await sub.getNew({ limit: 3 });

  }
  else if (desired == "controversial") {
    result = await sub.getControversial({ limit: 3 });

  }
  else if (desired == "rising") {
    result = await sub.getRising({ limit: 3 });
  }
  else
    return;

  // Grabs first post
  const first = result[0];
  var array = [];
  var body;

  for (var i = 0; i < result.length; ++i) {
    // if it is a video
    if (result[i].media) {
      post.vidurl = result[i].media.reddit_video.fallback_url;
    }
    var post = {};

    post.title = result[i].title;
    post.ups = result[i].ups;
    post.permalink = result[i].permalink;
    post.url = result[i].url;
    post.created_utc = result[i].created_utc;
    post.author = "/u/" + result[i].author.name;
    post.moment = moment.unix(result[i].created_utc).format('MMMM Do YYYY, h:mm:ss a');
    post = { "post": post }
    array.push(post);
  }
  // return JSON.stringify(array);
  return array;
}
// //console.log(array);
// // if it is a video
// var post = {};

// if (first.media) {
//   post.vidurl = first.media.reddit_video.fallback_url;
// }
// post.title = first.title;
// post.ups = first.ups;
// post.permalink = first.permalink;
// post.url = first.url;
// post.created_utc = first.created_utc;
// post.author = "/u/" + first.author.name;
// post.moment = moment.unix(first.created_utc).format('MMMM Do YYYY, h:mm:ss a');
// body = { "post": post }
// var jzon = JSON.stringify(body);
// return;




 // Build Snoowrap and client
// const r = new snoowrap({
//   userAgent: 'scraper',
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   username: process.env.REDDIT_USER,
//   password: process.env.REDDIT_PASS
// });
