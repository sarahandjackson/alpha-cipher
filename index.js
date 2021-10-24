const encodeButton = document.getElementById('encode');
const decodeButton = document.getElementById('decode');
const content = document.getElementById('content-wrap');
const dynamicHeading = document.getElementById('dynamic-heading');
const dynamicMessage = document.getElementById('dynamic-message');

let codeType = "";

var alphabet = (charA, charZ) => {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}


function getLetter(alphaArray, char, key) {

  // get the index of the character in the alphabet array
  let newIndex = alphaArray.findIndex((alpha) => alpha === char);

  const totalLetters = alphaArray.length;

  // determine whether to encode or decode message
  // **** logic needs work!
  if (codeType === "encode") {
    newIndex += key;

    if (newIndex >= totalLetters) {
      let remainder = newIndex % totalLetters;
      return alphaArray[remainder];
    }

  } else {
    newIndex -= key;
    console.log(`new index: ${newIndex}`);

    if (newIndex < 0) {
      let remainder = Math.abs(newIndex % totalLetters);
      console.log(`remainder index: ${remainder}`);
      return alphaArray[(totalLetters - 1) - remainder];
    }
  }

  return alphaArray[newIndex];

}


function codeString() {
  let message = document.getElementById('message').value;
  let key = parseInt(document.getElementById('key').value);

  // create alphabet arrays
  const alphaLowerCaseArray = alphabet("a", "z");
  const alphaUpperCaseArray = alphabet("A", "Z");

  // code the message input - iterate through each character of the message
  const codedInput = Array.from(message).reduce((accumulator, char, index) => {

    // check if character is upper case or lower case
    const lowerCase = /[a-z]/.test(char);
    const upperCase = /[A-Z]/.test(char);

    // call the getLetter function to get the new encoded letter, add to the accumulator output
    if (upperCase) {
      const newUpperCaseLetter = getLetter(alphaUpperCaseArray, char, key);
      return accumulator += newUpperCaseLetter;
    }

    if (lowerCase) {
      const newLowerCaseLetter = getLetter(alphaLowerCaseArray, char, key);
      return accumulator += newLowerCaseLetter;
    }

    // final return of new characters
    return accumulator += char;

  }, "");

  console.log(`Coded message: ${codedInput}`);

  // Print the message to the page
  printMessage(codedInput);

  return codedInput;

}


function printMessage(message) {

  content.classList.remove('hidden');

  if (codeType === "encode") {
    dynamicHeading.innerHTML = "Here's your encoded message:";
  } else {
    dynamicHeading.innerHTML = "Here's your decoded message:";
  }

  dynamicMessage.innerHTML = message;

  // reset the code type
  codeType = "";

}

encodeButton.addEventListener('click', function() {
  codeType = "encode";
  codeString();
});

decodeButton.addEventListener('click', function() {
  codeType = "decode";
  codeString();
});




// Original challenge:
// Write a function that takes a string and a cipher key and returns the original string where each letter is shifted by the given cipher key.
//
// When shifting letters follow these rules:
//
//     Ignore punctuation and spaces.
//     Maintain the case of the letter
//     Assuming the cipher key is 5, a -> f, b -> g, u -> z, v -> a, w -> b, A -> F, B -> G… etc.
//
// For example:
//
// Given "Zwddg ogjdv!" and a cipher key of 8, the result would be "Hello world!"
