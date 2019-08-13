/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetdata) {
  const now = new Date();
  const created = tweetdata.created_at;
  
  const markup = $(`
  <article class="tweet">
  <header>
    <span><img src="${tweetdata.user.avatars}">${tweetdata.user.name}</span>
        <span class="tweet-user">${tweetdata.user.handle}</span>
    </header>
      <p>
        ${tweetdata.content.text}
      </p>
  <footer>
    <span>
      ${now} days ago
    </span>
    <span class="tweetcons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
    </span>
  </footer>
  </article>

  `);





  return markup;
}


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}



const $tweet = createTweetElement(tweetData);
console.log($tweet); // to see what it looks like
$(document).ready(function () {
  $('#tweets-container').append($tweet);
});

