//elements
const elemMessage = document.querySelector(".message");
const elemKey = document.querySelector(".key");
const elemResult = document.querySelector(".result-message");
const btnEncrypt = document.querySelector(".encrypt");
const btnDecrypt = document.querySelector(".decrypt");
const btnCopy = document.querySelector(".copy");

//eventListeners
btnEncrypt.addEventListener("click", () =>
  decryptOrEncryptMessage(elemMessage.value, elemKey.value, "+")
);

btnDecrypt.addEventListener("click", () =>
  decryptOrEncryptMessage(elemMessage.value, elemKey.value, "-")
);

btnCopy.addEventListener("click", function () {
  navigator.clipboard.writeText(elemResult.value);
});

// prettier-ignore
const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",  
"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", 
"1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "'", "_",
"-", "&", "@", "#", "$", "%", "*", "(",")", " "];

const decryptOrEncryptMessage = function (message, secretKey, operator) {
  let key = secretKey.toUpperCase();
  const msg = message.toUpperCase();

  while (key.length < msg.length) {
    key += key;
  }

  elemResult.value = msg.split("").reduce((word, _currLetter, currInd) => {
    let index_sum =
      operator === "+"
        ? characters.findIndex((elem) => elem === msg[currInd]) +
          characters.findIndex((elem) => elem === key[currInd])
        : characters.findIndex((elem) => elem === msg[currInd]) -
          characters.findIndex((elem) => elem === key[currInd]);

    if (index_sum < 0) {
      index_sum = characters.length + index_sum;
    }

    const index = index_sum % characters.length;
    return (word += characters[index]);
  }, "");
};
