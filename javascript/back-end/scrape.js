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
    result = await sub.getTop({ limit: 50 });
  }
  else if (desired == "hot") {
    result = await sub.getHot({ limit: 50 });
  }
  else if (desired == "new") {
    result = await sub.getNew({ limit: 50 });

  }
  else if (desired == "controversial") {
    result = await sub.getControversial({ limit: 50 });

  }
  else if (desired == "rising") {
    result = await sub.getRising({ limit: 50 });
  }
  else
    return;

  var array = [];

  for (var i = 0; i < result.length; ++i) {
    var post = {};

    // if it is a video
    if (result[i].media) {
      if (result[i].media.oembed) {
        var index = result[i].media.oembed.html.indexOf("class");
        var toAdd = 'id="yt-vid" ';
        post.html = result[i].media.oembed.html;
        post.html = post.html.slice(0, index) + toAdd + post.html.slice(index);
        console.log(post.html);
      }
      else
        post.vidurl = result[i].media.reddit_video.fallback_url;
    }

    if (result[i].url.endsWith("jpg") || result[i].url.endsWith("png") || result[i].url.endsWith("gif")) {
      post.image = result[i].url;
    }
    post.title = result[i].title;
    post.ups = result[i].ups;
    post.permalink = result[i].permalink;
    post.url = result[i].url;
    post.created_utc = result[i].created_utc;
    post.author = "/u/" + result[i].author.name;
    post.moment = moment.unix(result[i].created_utc).format('MMMM Do YYYY, h:mm:ss a');
    //post = { "post": post }
    array.push(post);
  }
  // return JSON.stringify(array);
  var obj = { "listings": array };
  return JSON.stringify(obj);
}

 // Build Snoowrap and client
// const r = new snoowrap({
//   userAgent: 'scraper',
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   username: process.env.REDDIT_USER,
//   password: process.env.REDDIT_PASS
// });
