
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
