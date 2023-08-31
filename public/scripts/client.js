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
        <p>${tweet.content.text}</p>
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
    // Validate the tweet content
    const tweetContent = $("#tweet-text").val().trim();
    if (tweetContent === "") { //can also have !tweetContent
      alert("Tweet content is not present. Please enter a tweet.");
      return; // Exit the function if validation fails
    }
    if (tweetContent.length > 140) {
      alert("Tweet content is too long. Maximum 140 characters allowed.");
      return;
    }
    //serialize the form data
    const serializedData = $(this).serialize();
    //send a POST request for a new tweet
    $.post("/tweets", serializedData)
      .then((response) => {
        console.log("Success: ", response);
        loadTweets(); //fetch and render updated tweets
        tweetContent.val(""); //clear input field after successful submission
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });
});
