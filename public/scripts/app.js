/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function timeSince(date) {
  //stolen from stackoverflow https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const createTweetElement = function (tweetdata) {

  const created = timeSince(tweetdata.created_at) + " ago";

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
      ${created} 
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

const renderTweets = function (tweets) {
  $(document).ready(function () {
    let tweet;
    for (let key of tweets) {
      console.log(key)
      tweet = createTweetElement(key)

      $('#tweets-container').append(tweet);
    }
  });
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);


$(document).ready(function () {
  const $form = $('#tweet-form')
  $form.submit(function (event) {
    const formData = $form.serialize();
    event.preventDefault();

    console.log('Button clicked, performing ajax call...');
    $.ajax({url: "/tweets", type: 'POST', data: formData })
    .then(function (morePostsHtml) {
      console.log('Success: ', morePostsHtml);
    });
  });
});