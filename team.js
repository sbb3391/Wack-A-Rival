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
    this.wackA = team["wack_a"]
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
      team["description"] = teamData.attributes.description,
      team["wack_a"] = teamData.attributes.wack_a
  
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
    
    const teamAndButton = document.createElement("div")
    teamAndButton.id = "team-and-button"
    teamAndButton.className = "w-full"
    teamAndButton.innerHTML = `
      <div class="flex flex-col justify-center space-y-2">
        <h1 class="text-center text-3xl">${this.school}</h1>
        <div class="self-center">
          <button id="wack-a-button" class="bg-blue-400 text-white w-48 h-8 border rounded-md">Wack-a-${this.wackA}</button>
        </div>
      </div>
      <div>
      </div>
    `

    const teamOverviewDiv = document.createElement("div")
    teamOverviewDiv.className = "w-full h-full flex flex-col align-center space-y-4 pt-6"
    teamOverviewDiv.innerHTML = `
      <h1 class="text-center">${this.shorthandName} ${this.nickname}</h1>
      <div class="flex justify-center">
        <img class="text-center self-center items-center content-center" src="./gifs/golden-boot.jpg" width="400">
      </div>
      <div>
        <p class="text-center">Rivalry Overview<p><br>
        <p class="text-center">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to 
      </div>
      <div>
        <p class="text-center">Fun Fact<p><br>
        <p class="text-center">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to 
      </div>
      <p class="text-center">Series Record: 100-18<p>
    `
  
    document.querySelector("div#mascot-selection").parentElement.insertAdjacentElement("beforeEnd", teamAndButton)
    document.querySelector("div#main-div").firstElementChild.appendChild(teamOverviewDiv);
  
    document.querySelector("#wack-a-button").addEventListener("click", () => {
      event.preventDefault();
      displayGameSettings();
  
    })
  }
    
}