$(document).ready(function() {
  $("textarea#tweet-text").on("input", function() {
    // Code to handle the event
    console.log("Textarea input event triggered");
    console.log(this); // `this` refers to the textarea element
    // Update the counter or perform any other actions
    let tweetLength = $(this).val().length;
    let charactersLeft = 140 - tweetLength;
    // console.log(charactersLeft);
    let counter = $("#tweet-counter");
    counter.text(charactersLeft);

    if (charactersLeft < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});