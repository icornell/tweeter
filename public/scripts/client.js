/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  //function to create a tweet element
  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="tweet">
      <header class="tweet-header">
        <img class="avatar" src="${
          tweet.user.avatars
        }" alt="User Profile Image">
        <div class="user-info">
          <h3 class="name">${tweet.user.name}</h3>
          <p class="handle">${tweet.user.handle}</p>
        </div>
      </header>
      <div class="tweet-content">
      <p>${$("<div>").text(tweet.content.text).html()}</p>
      </div>
      <hr class="tweet-line">
      <footer class="tweet-footer">
        <div class="date">
          <p class="timestamp">${timeago.format(tweet.created_at)}</p> 
        </div>
        <div class="icons">
          <i class="fa-solid fa-comment"></i>
          <i class="fas fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
        `);
    return $tweet;
  };

  //function to render the tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();
    const reverseTweets = tweets.reverse(); //to reverse the array of tweets to show the most recent at the top
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.append($tweetElement);
    }
  };

  const loadTweets = function () {
    //fetch the tweets using AJAX
    $.get("http://localhost:8080/tweets")
      .then(function (response) {
        // Call the renderTweets function with the response
        renderTweets(response);
      })
      .catch(function (error) {
        console.error("Error fetching tweets:", error);
      });
  };
  // Call the loadTweets function to fetch and render tweets on page load
  loadTweets();

  // Submit a New Tweet
  $(".new-tweet-form").submit(function (event) {
    console.log("Form submitted");
    // Prevent the default form submission behavior
    event.preventDefault();
    //slide up the error message if it is visible
    $(".error-message").slideUp();
    // Validate the tweet content
    const tweetContent = $("#tweet-text").val().trim();
    if (!tweetContent) {
      $(".error-message .error-text").text(
        "Don't panic, but your tweet needs words! In the vast universe of tweets, an empty one is like a towel without a purpose."
      );
      $(".error-message").slideDown();
      return; // Exit the function if validation fails
    }
    if (tweetContent.length > 140) {
      $(".error-message .error-text").text(
        "Curiouser and curiouser! Your tweet should be under 140 characters, or you'll fall down a digital rabbit hole!"
      );
      $(".error-message").slideDown();
      return;
    }
    //serialize the form data
    const serializedData = $(this).serialize();
    //send a POST request for a new tweet
    $.post("/tweets", serializedData)
      .then((response) => {
        console.log("Success: ", response);
        loadTweets(); //fetch and render updated tweets
        $(".counter").text("140"); // Reset the counter to 140
        $("#tweet-text").val(""); // Clear the tweet submission field
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });
});
