class Team {
  constructor(team) {

    this.id = team["id"]
    this.school = team["school"],
    this.nickname = team["nickname"],
    this.shorthandName = team["shorthand_name"],
    this.realLifeRecordVsArkansas = team["real_life_record_vs_arkansas"],
    this.winsInGame = team["wins_in_game"],
    this.lossesInGame = team["losses_in_game"],
    this.description = team["description"],
    this.mascot = team["mascot"]
  }

  static getAllTeams() {
    fetch("http://localhost:3000/teams")
    .then(resp => resp.json())
    .then(json => Team.addTeams(json))
  }

  static all = []

  static addTeams(json) {
    json.data.forEach( teamData => {
  
      let team = {};
  
      team["id"] = teamData.id,
      team["school"] = teamData.attributes.school,
      team["nickname"] = teamData.attributes.nickname,
      team["shorthand_name"] = teamData.attributes.shorthand_name,
      team["real_life_record_vs_arkansas"] = teamData.attributes.real_life_record_vs_arkansas,
      team["wins_in_game"] = teamData.attributes.wins_in_game,
      team["losses_in_game"] = teamData.attributes.losses_in_game,
      team["description"] = teamData.attributes.description
  
      let newTeam = new Team(team)
  
      Team.all.push(newTeam)
    })
  
    json.included.forEach( mascotData => Mascot.addMascot(mascotData) )

    Mascot.displayMascotCarosel();
  }

  showTeamAndMascotDetails() {
    // remove teamDetails if they exist
    removeTeamDetails();
  
    const mascotId = document.querySelector(".mascot-image").dataset.mascotId
    const mascotObject = Mascot.all.find( element => { return this.id == mascotId })
    
    const teamDetailDiv = document.createElement("div")
    teamDetailDiv.id = "team-detail"
    teamDetailDiv.className = "w-full h-3/5"
    teamDetailDiv.innerHTML = `
      <div class="flex flex-col justify-center space-y-2 py-3">
        <h1 class="text-center text-3xl">${this.school}</h1>
        <h3 class="text-center text-xl">${this.shorthandName} ${this.nickname}</h3>
        <div class="self-center">
          <button class="bg-blue-400 text-white w-48 h-8 border rounded-md">Wack-a-${this.nickname}</button>
        </div>
      </div>
      <div>
      </div>
    `
  
    document.querySelector("div#top-view").insertAdjacentElement("afterend", teamDetailDiv)
  
    teamDetailDiv.querySelector("button").addEventListener("click", () => {
      event.preventDefault();
      countDownToStartGame(this.mascot);
  
    })
  }
    
}