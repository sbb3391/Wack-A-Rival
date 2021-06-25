class Highlight {
  constructor(highlight) {
    this.description = highlight["description"],
    this.id = highlight["id"],
    this.mediaUrl = highlight["mediaUrl"],
    this.winOrLoss = highlight["winOrLoss"],
    this.teamId = highlight["teamId"]
  }

  static createHighlight(highlightData) {
    let highlight = {}

    highlight["description"] = highlightData.attributes.description,
    highlight["mediaUrl"] = highlightData.attributes.media_url,
    highlight["winOrLoss"] = highlightData.attributes.win_or_loss,
    highlight["id"] = highlightData.id
    highlight["teamId"] = highlightData.relationships.team.data.id

    let newHighlight = new Highlight(highlight);
    return newHighlight;
  }

  pushHighlightToWinOrLoss() {
    if (this.winOrLoss === "win") {
      gameDetails.winHighlights.push(this) 
    } else {
      gameDetails.lossHighlights.push(this)
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
      let newHighlight = Highlight.createHighlight(element)
      newHighlight.pushHighlightToWinOrLoss();
    })
      
  }

  static parseAndDisplayAllHighlights(json) {
    const teamDivs = Array.from(document.querySelector("div#highlight-teams").children)
    json.data.forEach(function(element) {
      const divForThisHighlight = teamDivs.find(div => div.dataset.teamId === element.relationships.team.data.id)
      const team = Team.all.find(team => team.id === divForThisHighlight.dataset.teamId)
      const ul = divForThisHighlight.firstElementChild
      const newLi = document.createElement("li");
      newLi.innerText = `${team.shorthandName} ${element.attributes.win_or_loss} -- DATE`
      newLi.dataset.highlightId = element.id
      newLi.className = "pl-8 text-sm cursor-pointer"

      ul.appendChild(newLi)

      newLi.addEventListener("click", showHighlightDetails)
    })
  }

  static displayHighlights() {
    const backgroundDiv = document.createElement("div");
    const highlightsDiv = createHighlightsDiv();

    backgroundDiv.id = "background-div"
    backgroundDiv.className = "w-5/6 h-5/6 bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative"
    highlightsDiv.id = "highlight-teams"

    // populate highlights div with each team
    Team.all.forEach(function(element) {
      let newTeamDiv = document.createElement("div");
      const newUl = document.createElement("ul");
      newTeamDiv.dataset.teamId = element.id
      newTeamDiv.innerText = element.shorthandName;
      newTeamDiv.appendChild(newUl);
      highlightsDiv.appendChild(newTeamDiv)
    })

    const newSpan = document.createElement("span");
    newSpan.innerHTML = "&#88;"
    newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1"
    highlightsDiv.insertAdjacentElement("afterbegin", newSpan)

    newSpan.addEventListener("click", function() {
      backgroundDiv.remove();
      document.querySelector("div#main-div").classList.remove("filter", "blur-md");
      document.querySelector("div#form-background-div").classList.add("hidden")
    })

    fetch("http://localhost:3000/highlights")
    .then(resp => resp.json())
    .then(json => Highlight.parseAndDisplayAllHighlights(json))
  
    backgroundDiv.appendChild(highlightsDiv);
    document.querySelector("div#form-background-div").appendChild(backgroundDiv); 
    document.querySelector("div#main-div").className += ' filter blur-md'
    document.querySelector("div#form-background-div").classList.remove("hidden")
  }

  static addANewHighlight() {

  }
  
}