"use strict";

let randomNum = Math.floor(Math.random() * 100) + 1;
const numForm = document.querySelector("#game-wrap .form"),
  numInput = document.querySelector("#game-wrap .input"),
  numBtn = document.querySelector("#game-wrap .btn-save"),
  resultWrap = document.getElementById("result-wrap"),
  userValueList = document.querySelector(".user-answer"),
  result = document.querySelector("#result-wrap .result"),
  resultNum = document.querySelector("#result-wrap .result-num"),
  correct = document.getElementById("correct"),
  wrong = document.getElementById("wrong"),
  over = document.getElementById("over"),
  lowNhigh = document.querySelector("#wrong .lowhigh"),
  chanceNum = document.querySelector("#wrong .chance"),
  answerNum = document.querySelector(".num-right"),
  btnNewGame = document.getElementById("btn-new-game");

let userNum = document.querySelector("#result-wrap .user-answer .num"),
  numList = [],
  countNum = 1;

function startRandomNum() {
  return randomNum;
}

function submitForm() {
  if (numInput.value !== null) {
    numForm.addEventListener("submit", numSubmit);
  }
}

function numSubmit(e) {
  e.preventDefault();
  inputCheck();
  console.log(`1. randomNum : ${randomNum}`);
}

function inputCheck() {
  if (parseInt(numInput.value) <= 100) {
    countDown();
  } else if (parseInt(numInput.value) > 100) {
    alert("100 이하만 입력 가능합니다.");
    numInput.value = "";
  } else if (numInput.value === "") {
    alert("숫자를 입력해주세요.");
    numInput.value = "";
  } else {
    alert("숫자만 입력 가능합니다.");
    numInput.value = "";
  }
}

function common() {
  numList.push(numInput.value);
  userNum.innerText = numList.join(" ");
}

function countDown() {
  let inputValue = parseInt(numInput.value);
  if (countNum === 1) {
    userValueList.classList.add("disblock");
    resultWrap.classList.add("disblock");
    wrong.classList.add("disblock");
    numCheck();
  } else if (countNum <= 9) {
    numCheck();
  } else if (countNum === 10) {
    gameOver();
  }

  function numCheck() {
    if (inputValue === randomNum) {
      numCorrect();
    } else if (inputValue !== randomNum) {
      numWrong();
    } else if (countNum === 1 && value !== randomNum) {
      userNum.innerText = `${numList.join(" ")}`;
    }
  }

  function numCorrect() {
    common();
    wrong.classList.remove("disblock");
    correct.classList.add("disblock");
    btnNewGame.classList.add("disblock");
    newGame();
  }

  function numWrong() {
    common();
    chanceNum.innerText = `${10 - countNum}번 남았습니다.`;
    if (randomNum < inputValue) {
      lowNhigh.innerText = "입력한 숫자보다 낮게";
    } else if (randomNum > inputValue) {
      lowNhigh.innerText = "입력한 숫자보다 높게";
    }
    console.log("2. numInput.value :", numInput.value);
    countNum++;
    numInput.value = "";
    numInput.focus();
  }

  function gameOver() {
    wrong.classList.remove("disblock");
    over.classList.add("disblock");
    btnNewGame.classList.add("disblock");
    answerNum.innerText = `정답은 ${randomNum}이였지롱~!!`;
    common();
    numInput.value = " ";
    numInput.disabled = true;
    numBtn.disabled = true;
    newGame();
  }
}

function resetGame() {
  numList = [];
  countNum = 1;
  userNum.innerText = numList.join(" ");
  correct.classList.remove("disblock");
  over.classList.remove("disblock");
  btnNewGame.classList.remove("disblock");
  resultWrap.classList.remove("disblock");
  userValueList.classList.remove("disblock");
  numInput.disabled = false;
  numBtn.disabled = false;
  numInput.value = "";
  numInput.focus();
  randomNum = Math.floor(Math.random() * 100) + 1;
}

function newGame() {
  btnNewGame.addEventListener("click", resetGame);
}

function init() {
  startRandomNum();
  submitForm();
}

init();
