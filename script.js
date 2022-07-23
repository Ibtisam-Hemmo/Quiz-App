
const element = document.querySelector(".container");

function getPlayers() {
  const players = JSON.parse(localStorage.getItem("users"));

  for(let i=1;i<players.length;i++){

    for(let j=0;j<i;j++){
        if(players[j].score<players[i].score){
            let temp=JSON.parse(JSON.stringify(players[j]));
            players[j]=JSON.parse(JSON.stringify(players[i]));
            players[i]=JSON.parse(JSON.stringify(temp));

        }

    }
  }





  for (let i in players) {
    
    const div = document.createElement("div");
    div.classList.add("player-info");

    const _name = document.createElement("span");
    _name.classList.add("name");
    _name.innerText = players[i].name;
    const score = document.createElement("span");
    score.classList.add("Score");
    score.innerText = players[i].score;
    div.append(_name);
    div.append(score);
    element.append(div);
  }
}

getPlayers()


