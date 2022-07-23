const questions = [
  {
    text: "Which organization defines Web standards?",
    choices: [
      "Apple Inc.",
      "IBM Corporation",
      "World Wide Web Consortium",
      "Microsoft Corporation",
    ],
    answer: 1,
    flag: false,
  },
  {
    text: "HTML is considered as ______ ?",
    choices: [
      "Programming language",
      "OOP language",
      "High level language",
      "Markup language",
    ],
    answer: 3,
    flag: false,
  },
  {
    text: "HTML uses ______?",
    choices: [
      "User-defined tags",
      "Predefined tags",
      "Fixed tags defined by the language",
      "Fixed tags defined by the language",
    ],
    answer: 2,
    flag: false,
  },
  {
    text: "HTML was first proposed in ___.",
    choices: ["1980", "1990", "1995", "2000"],
    answer: 1,
    flag: false,
  },
  {
    text: "Which of the following is not a browser?",
    choices: ["Netescape", "Mozilla Firefox", "Microsoft Bing", "Opera"],
    answer: 2,
    flag: false,
  },
  {
    text: "Who is the main author of the HTML?",
    choices: [
      "Brendan Eich",
      "Tim Berners-Lee",
      "Web developer",
      " Google Inc",
    ],
    answer: 1,
    flag: false,
  },
  {
    text: "If we want to set the style for just one element, which css selector will we use?",
    choices: ["id", "text", "class", "name"],
    answer: 1,
    flag: false,
  },
  {
    text: "The HTML tag that specifies a CSS style embedded in an element is called ____?",
    choices: ["Design", "Style", "Modify", "Define"],
    answer: 1,
    flag: false,
  },
  {
    text: "A stricter type of HTML document is known as ______?",
    choices: ["DHTML", "XHTML", "XML", "XML"],
    answer: 1,
    flag: false,
  },
  {
    text: "The HTML standard which does not require double quotes around the values of an attribute is called ______?",
    choices: ["HTML 1", "HTML 3", "HTML 5", "HTML 7"],
    answer: 2,
    flag: false,
  },
];

let users;

if (!localStorage.getItem("users")) {
  users = [];
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users"));
}
function getUser(userName) {
  let users = getUsers();
  for (let i in users) {
    if (users[i].name === userName) {
      return users[i];
    }
  }
}
function inputUserName() {
  let userName = document.getElementById("name").value;

  if (getUser(userName)) {
    
    let alert = document.getElementById("alert");

    alert.innerText = "The user name is alreay exist ! try another one.";
  }else{
    let text = `./home.html?name=${userName}`;

  document.querySelector(".btn.start").setAttribute("href", text);

  let user = {
    name: userName,
    score: 0,
    quis: questions,
  };

  var localusers = JSON.parse(localStorage.getItem("users"));

  localusers.push(user);

  localStorage.setItem("users", JSON.stringify(localusers));


  }

  
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

document.getElementById("inputName").addEventListener("click", inputUserName);
