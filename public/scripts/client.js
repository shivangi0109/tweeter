/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').append($tweet); // Add the tweet to the tweets container
    }
  }

  // Function to create the HTML structure for a tweet
  function createTweetElement(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src="${tweet.user.avatars}">
            <span>${tweet.user.name}</span>
          </div>
          <div>
            <span>${tweet.user.handle}</span>
          </div>
        </header>
        <div>
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <div>
            <span>${tweet.created_at}</span>
          </div>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  }

  renderTweets(data);

  const $form = $('form'); // Get the form element
  
  $form.submit(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Your AJAX POST request goes here
    const formData = $form.serialize(); // Serialize the form data which turns a set of form data into a query string.

    // This serialized data should be sent to the server in the data field of the AJAX POST request
    // Send the serialized data to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function(response) {
        // Handle the successful response from the server
        console.log('Tweet submitted successfully:', response);
      },
      error: function(error) {
        // Handle the error response from the server
        console.error('Error submitting tweet:', error);
      }
    });
  });
});