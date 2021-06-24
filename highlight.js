class Highlight {
  constructor(highlight) {
    this.description = highlight["description"],
    this.id = highlight["id"],
    this.mediaUrl = highlight["mediaUrl"],
    this.winOrLoss = highlight["winOrLoss"]
  }

  static createHighlight(highlightData) {
    let highlight = {}

    highlight["description"] = highlightData.attributes.description,
    highlight["mediaUrl"] = highlightData.attributes.media_url,
    highlight["winOrLoss"] = highlightData.attributes.win_or_loss,
    highlight["id"] = highlightData.id

    let newHighlight = new Highlight(highlight);

    if (newHighlight.winOrLoss === "win") {
      gameDetails.winHighlights.push(newHighlight) 
    } else {
      gameDetails.lossHighlights.push(newHighlight)
    }
  }
  static getWinOrLossMedia() {
    const highlightParams = {
      team_id: Team.all.find(element => element.id == gameDetails.gameMascot.team_id).id,
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
    .then(json => Highlight.addHighlights(json))
  }
  
  static addHighlights(json) {
    json.data.forEach(function(element) {
      Highlight.createHighlight(element)
    })
      
  }
}