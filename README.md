# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This app was built as part of the Lighthouse Labs Web Development Flex Bootcamp in the June 12, 2023 cohort. The purpose of this project was to learn and practice both back-end and front-end web development. Tweeter uses  HTML, CSS, JS, jQuery and AJAX for the front-end, and Node and Express for the back-end.

## Features

- Begin by writing a tweet in the text area and clicking the "Tweet" button. This will submit the tweet and display it on the page, with the most recent tweets at the top. The tweet will also be erased from the text area.
- The app will display an animated scrolling error message if the user tries to submit an empty tweet or a tweet that is too long, and delete the error when a vaild tweet is submitted.
- The app will display a green counter that counts down the number of characters remaining in the tweet. The counter will turn red when the number of characters remaining is less than 0.
- The app uses responsive design and will adapt to different screen sizes.


## Screenshots

Main page: 

Main page with the error message displayed when the user tries to submit an empty tweet:

Main page with the error message displayed when the user tries to submit a tweet that is too long:

Condensed view of the main page for mobile devices:



## Getting Started

1. Clone this repository to your local machine. 
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.
5. Start writing your tweets in the text box and have fun! 

## Dependencies 

- Express
- Node 5.10.x or above
- Body-parser
- Chance
- Md5
- Timeago.js
- SASS

## DevDependencies

- Nodemon