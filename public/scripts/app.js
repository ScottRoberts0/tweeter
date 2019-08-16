/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




const timeSince = function(date) {
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

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
        ${escape(tweetdata.content.text)}
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
  let tweet;
  $('#tweets-container').empty();
  
  for (let key of tweets) {
    tweet = createTweetElement(key)
    $('#tweets-container').prepend(tweet);
  }
  
}


const loadtweets = function () {
  $.ajax({ url: "/tweets", type: "GET" })
    .then(function (responseData) {
      renderTweets(responseData);
    });
}

$(document).ready(function () {
  //pageload setup
  loadtweets();
  $('#error').hide();
  $('#topbutton').hide();
  const $form = $('#tweet-form');

  $form.submit(function (event) {
    const textareaVal = $("textarea").val();
    const tweetlength = Number($(".counter").text());
    event.preventDefault();

    console.log(typeof tweetlength);

    if (tweetlength < 0) {
      $('#msg').text("ERROR: Tweet Length Over 140 Chars");
      $('#error').show("slow", () => {
        $("textarea").focus();
      });
    } else if (textareaVal === "") {
      $('#msg').text("ERROR: Tweet is EMPTY");
      $('#error').show("slow", () => {
        $("textarea").focus();
      });
    } else {
      $('#error').slideUp();
      const formData = $form.serialize();

      console.log('Button clicked, performing ajax call...');

      $.ajax({ url: "/tweets", type: 'POST', data: formData })
        .then(function () {
          loadtweets();
          console.log('Success!');
          $("textarea").val("");
          $(".counter").html(140);
        });
    }
  });

  $('#tweet-btn').click(function () {
    $(".new-tweet").toggle("slow", () => {
      $("textarea").focus();
    });
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#topbutton').fadeIn();
    } else {
      $('#topbutton').fadeOut();
    }
  });

  $('#topbutton').click(function () {
    window.scrollTo(0, 0);
    $(".new-tweet").show("slow")
  })
});

