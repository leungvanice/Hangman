var guess_text = document.querySelector("#guess-text");
var toGuessText;
var correct_ans;
var underscoredGuessText = "_";
var wrong_history = "";
var wrong_guess_ele = document.querySelector("#wrong-guess-text");
var inputField = document.querySelector("#input-field");

// Changing photo setting
var photo_ele = document.querySelector("#photo");
var photoCounter = 1;
var first_photo = "Hangman_pics/Hangman_1.jpg";

settingUnderscoreFunc();

function settingUnderscoreFunc() {
  photo_ele.src = first_photo;
  wrong_history = "";
  wrong_guess_ele.innerHTML = wrong_history;
  toGuessText = prompt("Type in one word: ");
  correct_ans = toGuessText;
  underscoredGuessText = "_";
  for (let i = 1; i < toGuessText.length; i++) {
    underscoredGuessText += " ";
    underscoredGuessText += "_";
  }
  guess_text.innerHTML = underscoredGuessText;
}

function guessSubmitFunc() {
  if (inputField.value.length === 1) {
    checkLetter(inputField.value);
  } else {
    alert("Please fill in one character");
  }
  // checkLetter(inputField.value);
  inputField.value = "";
  wrong_guess_ele.innerHTML = wrong_history;
  inputField.focus();
}

function checkLetter(val) {
  var counter = 0;
  var LowerCaseval = val.toLowerCase();
  console.log(LowerCaseval);
  for (letter of toGuessText) {
    if (LowerCaseval === letter) {
      console.log("Correct");
      var theIndex = toGuessText.indexOf(LowerCaseval);
      console.log(theIndex);
      replaceUnderscore(theIndex);
      endGame();
    } else {
      counter++;
      if (counter === toGuessText.length) {
        photoCounter++;
        photo_ele.src = `Hangman_pics/Hangman_${photoCounter}.jpg`;
        if (photoCounter === 7) {
          alert("Lose");
          settingUnderscoreFunc();
          break;
        }
        if (wrong_history === "") {
          wrong_history += val;
        } else {
          wrong_history += ", ";
          wrong_history += val;
          wrong_guess_ele.innerHTML = wrong_history;
        }
      }
    }
    // endGame();
  }
}

function replaceUnderscore(index) {
  if (index === 0) {
    underscoredGuessText = underscoredGuessText.replace(
      underscoredGuessText[index],
      toGuessText[index]
    );
    guess_text.innerHTML = underscoredGuessText;
    toGuessText = toGuessText.replaceAt(index, "-");
  } else {
    console.log(index);
    var newIndex = index * 2;
    underscoredGuessText = underscoredGuessText.replaceAt(
      newIndex,
      toGuessText[index]
    );
    console.log(underscoredGuessText);
    guess_text.innerHTML = underscoredGuessText;
    toGuessText = toGuessText.replaceAt(index, "-");
  }
}
String.prototype.replaceAt = function(index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

function endGame() {
  var looptime = 0;
  // win
  for (letter of toGuessText) {
    if (letter === "-" || letter === "_") {
      looptime++;
      if (looptime === toGuessText.length) {
        alert(
          "Congratulations" +
            `\nYou guessed it correct, the answer is "${correct_ans}"`
        );
        guess_text.innerHTML = "";
        settingUnderscoreFunc();
      }
    }
  }
}
