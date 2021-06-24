class Highlight {
  constructor() {

  }

  static getWinOrLossMedia() {
    const highlightParams = {
      team_id: Team.all.find(element => element.id == gameMascot.team_id).id,
    }
    
    const options = {
      method: "POST",
      body: JSON.stringify(highlightParams),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    }

    fetch(`http://localhost:3000/highlights/team_highlights`, options)
    .then(resp => resp.json())
    .then(json => displayHighlight(json))
  }
}