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

let userName = window.location.href.split("?")[1].split("=")[1];
let selected;
const questionsSec = document.querySelector("#questions");
let _name = document.getElementById("_name");
_name.innerText = userName;
function getUsers() {
  return JSON.parse(localStorage.getItem("users"));
}

function getUser() {
  let users = getUsers();
  for (let i in users) {
    if (users[i].name === userName) {
      return users[i];
    }
  }
}

function questionsLeft() {
  let user = getUser();
  let count = 0;
  for (let i = 0; i < user.quis.length; i++) {
    if (user.quis[i].flag) {
      count++;
    }
  }
  return count;
}
function incrementScore() {
  let users = getUsers();
  for (let user in users) {
    if (users[user].name === userName) {
      users[user].score = users[user].score + 1;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
}

function checkAnswer(rightAnswer) {

  if (rightAnswer === selected) {
    incrementScore();
  }
}
function nextButton(rightAnswer) {
  let button = document.getElementById("next-button");
  if (!button) {
    let but = document.getElementById("next");
    button = document.createElement("button");
    button.setAttribute("class", "btn start");
    button.setAttribute("id", "next-button");
    button.innerHTML = "Next";

    but.append(button);
    button.addEventListener("click", () => {
      const myElement = document.getElementById("full-question");
  
      myElement.innerHTML = "";
      button.remove()
      checkAnswer(rightAnswer);
  
      if (questionsLeft() === 10) {
        location.replace(`./end.html?score=${getUser().score}`);
      } else {
        showQuestion();
      }
    });
  }

  
}

function createSection(question) {
  let text = question.text;
  let choices = question.choices;

  let section = document.getElementById("full-question");

  let header = document.createElement("h1");
  header.setAttribute("id", "question");
  header.innerHTML = text;

  section.append(header);
  for (let i = 0; i < 4; i++) {
    let div = document.createElement("div");
    div.classList.add("choice-container");

    let p = document.createElement("p");
    p.classList.add("choice-text");

    p.innerHTML = choices[i];
    div.addEventListener("click", () => {
      selected=i+1
      nextButton(question.answer);

    });
    div.append(p);

    section.append(div);
  }
  questionsSec.append(section);
}

function isAnswered(index) {
  let users = getUsers();

  for (let user in users) {
    if (users[user].name === userName) {
      return users[user].quis[index].flag;
    }
  }
}

function getRandonQuestion() {
  let randonIndex = Math.floor(Math.random() * 10);
  if (isAnswered(randonIndex)) {
    return getRandonQuestion();
  } else {
    return [randonIndex, getUser().quis[randonIndex]];
  }
}

function showQuestion() {
  let users = getUsers();

  for (let user in users) {
    if (users[user].name === userName) {
      const [index, question] = getRandonQuestion();

      users[user].quis[index].flag = true;
      localStorage.setItem("users", JSON.stringify(users));

      createSection(question);
    }
  }
  let progressBar = document.getElementById("progressBarFull");

  progressBar.innerText = questionsLeft();
}

showQuestion();
