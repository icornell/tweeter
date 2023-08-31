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
  //function to render the tweets
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.append($tweetElement);
    }
  };

  //function to create a tweet element NOTE RETURN HERE FOR TIMESTAMP
  const createTweetElement = function (tweet) {
    let $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
      <img class="avatar" src="${tweet.user.avatars}" alt="User Profile Image">
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
        <p class="timestamp">${tweet.created_at}</p> 
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

  renderTweets(data);

  // Add an event listener for the form submit event
  $(".new-tweet-form").submit(function (event) {
    console.log("Form submitted");
    // Prevent the default form submission behavior
    event.preventDefault();
    // Serialize the form data
    const serializedData = $(this).serialize();

    $.post("/tweets", serializedData)
      .then((response) => {
        console.log("Success: ", response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });
});
