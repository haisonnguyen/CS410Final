//require('dotenv').config();

const snoowrap = require('snoowrap');
const jQuery = require('jquery');

// anytime you request ANYTHING from reddit please use await
async function run(){
  // Build Snoowrap and Snoostorm clients
// const r = new snoowrap({
//   userAgent: 'scraper',
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   username: process.env.REDDIT_USER,
//   password: process.env.REDDIT_PASS
// });
const r = new snoowrap({
  userAgent: 'scraper',
  clientId: "BwU0WnuK8201AQ",
  clientSecret: "hwttan89eHOYV3w8qaeZ2Me10Ic",
  username: "FlimsyInterest",
  password: "haihai123"
});

const sub = r.getSubreddit('funny');
// Grabs top posts
const top = await sub.getTop();
// Grabs first post
const first = top[0];
console.log(first.title);
console.log(first.ups);
console.log(first.permalink);
console.log(first.url);
console.log(first.created);
console.log(first.created_utc);
console.log(first.author);

jQuery("#title").text(first.title);

//r.getTop('AskReddit').then(console.log);
}

run().catch(console.error);

jQuery("#submit").on("click", run());