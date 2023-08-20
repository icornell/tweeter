$(document).ready(function () {
  const maxLength = 140; //Maximum tweet length is 140 characters

  //Target the input element inside the form - mine is input instead of textarea
  $('.new-tweet form input[type="text"]').on("input", function () {
    const inputValue = $(this).val();
    const remainingChars = maxLength - inputValue.length;

    // Find the closest .new-tweet section and then find the .counter element within it
    const counterElement = $(this).closest('.new-tweet').find('.counter');

    counterElement.text(remainingChars);

    //Check if the remaining characters are negative or positive (under or over the 140 char. limit)
    if (remainingChars < 0) {
      counterElement.addClass("over-limit"); //Add red class
      counterElement.removeClass("under-limit"); //Remove green class
    } else {
      counterElement.removeClass("over-limit"); //Remove red class
      counterElement.addClass("under-limit"); //Add green class
    }
  });
});
