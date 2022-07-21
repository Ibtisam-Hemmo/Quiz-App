// let questions = [
//   {
//     question: "Which organization defines Web standards?",
//     choices: [
//       "Apple Inc.",
//       "IBM Corporation",
//       "World Wide Web Consortium",
//       "Microsoft Corporation",
//     ],
//     answer: 1,
//     flag: false,
//   },
//   {
//     question: "HTML is considered as ______ ?",
//     choices: [
//       "Programming language",
//       "OOP language",
//       "High level language",
//       "Markup language",
//     ],
//     answer: 3,
//     flag: false,
//   },
//   {
//     question: "HTML uses ______?",
//     choices: [
//       "User-defined tags",
//       "Predefined tags",
//       "Fixed tags defined by the language",
//       "Fixed tags defined by the language",
//     ],
//     answer: 2,
//     flag: false,
//   },
//   {
//     question: "HTML was first proposed in ___.",
//     choices: ["1980", "1990", "1995", "2000"],
//     answer: 1,
//     flag: false,
//   },
//   {
//     question: "Which of the following is not a browser?",
//     choices: ["Netescape", "Mozilla Firefox", "Microsoft Bing", "Opera"],
//     answer: 2,
//     flag: false,
//   },
//   {
//     question: "Who is the main author of the HTML?",
//     choices: [
//       "Brendan Eich",
//       "Tim Berners-Lee",
//       "Web developer",
//       " Google Inc",
//     ],
//     answer: 1,
//     flag: false,
//   },
//   {
//     question:
//       "If we want to set the style for just one element, which css selector will we use?",
//     choices: ["id", "text", "class", "name"],
//     answer: 1,
//     flag: false,
//   },
//   {
//     question:
//       "The HTML tag that specifies a CSS style embedded in an element is called ____?",
//     choices: ["Design", "Style", "Modify", "Define"],
//     answer: 1,
//     flag: false,
//   },
//   {
//     question: "A stricter type of HTML document is known as ______?",
//     choices: ["DHTML", "XHTML", "XML", "XML"],
//     answer: 1,
//     flag: false,
//   },
//   {
//     question:
//       "The HTML standard which does not require double quotes around the values of an attribute is called ______?",
//     choices: ["HTML 1", "HTML 3", "HTML 5", "HTML 7"],
//     answer: 2,
//     flag: false,
//   },
// ];

let users = [];

const questionElem = document.querySelector("#question");
const choicesElem = Array.from(document.querySelectorAll(".choice-text"));//to form an array of the li elements *choices*
const progressText = document.querySelector("#progressText"); //for adding question number
// const name = document.querySelector("#name");
const progressBarFull = document.querySelector("#progressBarFull"); // To show the progress while answering 
const input = document.querySelector('input[id=name]');

let score = 0; // as a start of the quiz, the score will be zero
let counter = 0; // It is incremented when answering a question
const score_Points = 100;
const max_Questions = 10;






localStorage.setItem("users", JSON.stringify(users));

function getUsers() {
  return JSON.parse(localStorage.getItem("users"));
}

function inputUserName() {
  let userName = document.getElementById("name").value;
  console.log(userName)

  let text = `./home.html?name=${userName}`

  document.querySelector('.btn.start').setAttribute('href', text);

  let user = {
    name: userName,
    score: 0,
    quis: questions,
  };

  var localusers = JSON.parse(localStorage.getItem("users"));

  localusers.push(user);
  localStorage.setItem("users", JSON.stringify(localusers));
}

// function isAnswered(index, userName) {
//   let users = getUsers();

//   for (let user in users) {
//     if (users[user].name === userName) {
//       return users[user].quis.flag;
//     }
//   }
// }

// function getRandonQuestion(userName) {
//   let randonIndex = Math.floor(Math.random() * 10);
//   if (isAnswered(randonIndex, userName)) {
//     return getRandonQuestion();
//   } else {
//     return questions[randonIndex];
//   }
// }

function incrementScore(userName) {
  let users = getUsers();
  for (let user in users) {
    if (users[user].name === userName) {
      users[user].score = users[user].score + 1;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
}

function getScore(userName) {
  let users = getUsers();

  for (let user in users) {
    if (users[user].name === userName) {
      return users[user].score;
    }
  }
}

function answerQuestion(userName) {
  let users = getUsers();

  for (let user in users) {
    if (users[user].name === userName) {
      users[user].flag = true;
    }
  }

  localStorage.setItem("users", JSON.stringify(users));
}

function checkAnswer(userName, selected) {
  let users = getUsers();

  for (let user in users) {
    if (users[user].name === userName) {
      if (users[user].answer === selected) {
        incrementScore(userName);
        return true;
      } else {
        return false;
      }
    }
  }
}







document.querySelector('.btn.start').addEventListener('click', function() {
  inputUserName();
})