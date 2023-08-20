$(document).ready(function () {
  const maxLength = 140; //Maximum tweet length is 140 characters

  //Target the input element inside the form - mine is input instead of textarea
  $('.new-tweet form input[type="text"]').on("input", function () {
    const inputValue = $(this).val();
    const remainingChars = maxLength - inputValue.length;

    //Update the character counter text
    $(".counter").text(remainingChars);

    //Check if the remaining characters are negative or positive (under or over the 140 char. limit)
    if (remainingChars < 0) {
      $(".counter").addClass("over-limit"); //add red class
      $(".counter").removeClass("within-limit"); //Remove green class
    } else {
      $(".counter").removeClass("over-limit"); //Remove red class
      $(".counter").addClass("within-limit"); //Add green class
    }
  });
});
