/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      })
      .catch(function(error) {
        console.error('Error loading tweets:', error);
      });
  };

  const renderTweets = function(tweets) {
    // Clear existing tweets container
    $('.tweets-container').empty();

    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // $('.tweets-container').append($tweet); // Add the tweet to the tweets container
      $('.tweets-container').prepend($tweet); // Prepend the tweet to show the most recent tweet first
    }
  }

  // Function to create the HTML structure for a tweet
  function createTweetElement(tweet) {
    // <p>${$("<div>").text(tweet.content.text)}</p> // Method1: Use .text() to safely render the tweet content
    // By using .text(tweet.content.text).html(), we first escape the tweet content using .text() to ensure it's displayed as plain text. Then, we use .html() to convert it back to HTML format so that line breaks and other HTML entities are correctly rendered.
    
    // Method 2: escape function to avoid cross-scripting attacks on 
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeContent = escape(tweet.content.text); // Escape the tweet content

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
          <p>${safeContent}</p>
        </div>
        <footer>
          <div>
            <span>${timeago.format(tweet.created_at)}</span>
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

  const submitTweet = function(formData) {
    // This serialized data should be sent to the server in the data field of the AJAX POST request
    // Send the serialized data to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function(response) {
        // Handle the successful response from the server
        console.log('Tweet submitted successfully:', response);
        loadTweets(); // Reload the tweets to include the newly submitted tweet, without refreshing the page
        $textarea.val(''); // Clear the textarea after successful submission
      },
      error: function(error) {
        // Handle the error response from the server
        console.error('Error submitting tweet:', error);
      }
    });
  };

  const $form = $('form'); // Get the form element
  
  $form.submit(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const $textarea = $(this).find('textarea');
    const tweetContent = $textarea.val();

    if (!tweetContent) {
      alert('Tweet content is not present. Please enter your tweet.');
      return;
    }

    if (tweetContent.length > 140) {
      alert('Tweet content exceeds the maximum character limit of 140. Please shorten your tweet.');
      return;
    }

    const formData = $form.serialize(); // Serialize the form data which turns a set of form data into a query string.

    submitTweet(formData); // Call the submitTweet function to send the AJAX POST request

    $textarea.val(''); // Clear the textarea after successful submission
  });
});