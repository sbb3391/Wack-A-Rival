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
    .then(json => addTeams(json))
  }

  static all = []
    
}