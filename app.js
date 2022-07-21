let questions = [
  {
    question: "Which organization defines Web standards?",
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
    question: "HTML is considered as ______ ?",
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
    question: "HTML uses ______?",
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
    question: "HTML was first proposed in ___.",
    choices: ["1980", "1990", "1995", "2000"],
    answer: 1,
    flag: false,
  },
  {
    question: "Which of the following is not a browser?",
    choices: ["Netescape", "Mozilla Firefox", "Microsoft Bing", "Opera"],
    answer: 2,
    flag: false,
  },
  {
    question: "Who is the main author of the HTML?",
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
    question:
      "If we want to set the style for just one element, which css selector will we use?",
    choices: ["id", "text", "class", "name"],
    answer: 1,
    flag: false,
  },
  {
    question:
      "The HTML tag that specifies a CSS style embedded in an element is called ____?",
    choices: ["Design", "Style", "Modify", "Define"],
    answer: 1,
    flag: false,
  },
  {
    question: "A stricter type of HTML document is known as ______?",
    choices: ["DHTML", "XHTML", "XML", "XML"],
    answer: 1,
    flag: false,
  },
  {
    question:
      "The HTML standard which does not require double quotes around the values of an attribute is called ______?",
    choices: ["HTML 1", "HTML 3", "HTML 5", "HTML 7"],
    answer: 2,
    flag: false,
  },
];

const questionsSec = document.querySelector('#questions');



function createSection(question, choices) {
  let header = document.createElement('h1');
  header.setAttribute('id', 'question');
  header.innerHTML = question;

  questionsSec.append(header);

  for(let i=0; i<4; i++) {
    let div = document.createElement('div');
    div.classList.add('choice-container');

    let p = document.createElement('p');
    p.classList.add('choice-text');

    p.innerHTML = choices[i];

    div.append(p);

    questionsSec.append(div);
  }

}

function isAnswered(index, userName) {
  let users = getUsers();

  for (let user in users) {
    if (users[user].name === userName) {
      return users[user].quis.flag;
    }
  }
}

function getRandonQuestion(userName) {
  let randonIndex = Math.floor(Math.random() * 10);
  if (isAnswered(randonIndex, userName)) {
    return getRandonQuestion();
  } else {
    return questions[randonIndex];
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users"));
}

function showQuestion(userName) {
  // userName = input.value
  console.log(userName)
  let users = getUsers();

  for (let user in users) {
    if (users[user].name === userName) {

        const question=getRandonQuestion(userName);
        console.log(question.question);
        console.log(question.choices)

        

        createSection(question.question, question.choices)

    }
  }
}

let sami = window.location.href.split('?')[1].split('=')[1];
// console.log(sami)

showQuestion(sami)


// createSection()