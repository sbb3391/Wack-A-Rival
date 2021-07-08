class Highlight {
  constructor(highlight) {
    this.description = highlight["description"],
    this.id = highlight["id"],
    this.mediaUrl = highlight["mediaUrl"],
    this.highlightType = highlight["highlightType"],
    this.teamId = highlight["teamId"]
  }

  static createHighlight(highlightData) {
    let highlight = {}

    highlight["description"] = highlightData.attributes.description,
    highlight["mediaUrl"] = highlightData.attributes.media_url,
    highlight["highlightType"] = highlightData.attributes.highlight_type,
    highlight["id"] = highlightData.id
    highlight["teamId"] = highlightData.relationships.team.data.id

    let newHighlight = new Highlight(highlight);
    return newHighlight;
  }

  pushHighlightToHighlightType() {
    if (this.highlightType.toLowerCase() === "win") {
      gameDetails.winHighlights.push(this) 
    } else if (this.highlightType.toLowerCase() === "loss") {
      gameDetails.lossHighlights.push(this)
    }
  }

  static getHighlightMedia() {
    const highlightParams = {
      team_id: Team.all.find(element => element.id == gameDetails.gameMascot.teamId).id,
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
      newHighlight.pushHighlightToHighlightType();
    })
      
  }

  static parseAndDisplayAllHighlights(json) {
    const teamDivs = Array.from(document.querySelector("div#highlight-teams").children)
    json.data.forEach(function(element) {
      const divForThisHighlight = teamDivs.find(div => div.dataset.teamId == element.relationships.team.data.id)
      const team = Team.all.find(team => team.id == divForThisHighlight.dataset.teamId)
      const ul = divForThisHighlight.firstElementChild
      const newLi = document.createElement("li");
      newLi.innerText = `${team.shorthandName} ${element.attributes.highlight_type} -- DATE`
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
    backgroundDiv.className = "w-full h-5/6 bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative"
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
    const backgroundDiv = document.createElement("div");
    const highlightsDiv = createHighlightsDiv();

    backgroundDiv.id = "background-div"
    backgroundDiv.className = "w-5/6 h-5/6 bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative"
    highlightsDiv.id = "new-highlight"
    highlightsDiv.className += " space-y-3 overflow-auto z-10"

    backgroundDiv.appendChild(highlightsDiv);

    const newSpan = document.createElement("span")
    newSpan.innerHTML = "&#88;"
    newSpan.id = "close-new-highlight-form"
    newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1"
    highlightsDiv.insertAdjacentElement("afterbegin", newSpan)
    
    document.querySelector("div#form-background-div").appendChild(backgroundDiv); 
    document.querySelector("div#main-div").className += ' filter blur-md'
    document.querySelector("div#form-background-div").classList.remove("hidden")

    document.querySelector("#close-new-highlight-form").addEventListener("click", Highlight.closeNewHighlightForm)

    const teamNameWithId = Team.all.map(team => [team.shorthandName, team.id])

    highlightsDiv.innerHTML += `
      <h1 class="font-serif[1] font-bold text-2xl text-center mt-2">New Highlight</h1>
      <form id="create-highlight-form">
        <div class="flex flex-col space-y-3">
          <div class="w-full flex flex-col">
            <label class="mx-4">Team</label>
            <select id="team-id" class="border-black border-2 mx-4 rounded-md bg-gray-200 w-3/4 text-md">
            </select>
          </div>
          <div class="w-full flex flex-col">
            <label class="mx-4">Description</label>
            <textarea id="description" class="border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md" rows="7"></textarea> 
          </div>
          <div class="w-full flex flex-col">
            <label class="mx-4">Media Url</label>
            <textarea id="media-url" class="border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md" rows="7"></textarea> 
          </div>
          <div class="w-full h-1/4 flex flex-col">
            <label class="mx-4">Highlight Type</label>
            <select id="highlight-type" class="border-black border-2 mx-4 rounded-md bg-gray-200 w-3/4 text-md">
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
              <option value="Arkansas Highlight">Arkansas Highlight</option>
              <option value="Arkansas fail">Arkansas Fail</option>
            </select>
          </div>
          <div class="flex place-items-center justify-center pb-5">
            <input type="submit" value="Create Highlight" class="bg-blue-400 font-white w-36 h-10 rounded-md whitespace-normal">
          </div> 
        <div>
      <form>
    `

    const teamSelect = document.querySelector("#team-id");


    teamNameWithId.forEach(team => {teamSelect.innerHTML += `<option value='${team[1]}'>${team[0]}</option`});

    document.querySelector("#create-highlight-form").addEventListener("submit", Highlight.submitHighlight)

  }
  
  static closeNewHighlightForm() {
    document.querySelector("#background-div").remove();
    document.querySelector("div#main-div").classList.remove("filter", "blur-md");
    document.querySelector("div#form-background-div").classList.add("hidden")
  }

  static submitHighlight(event) {
    event.preventDefault;

    const data = {
      highlight: {
        team_id: document.querySelector("#team-id").value,
        description: document.querySelector("#description").value,
        media_url: document.querySelector("#media-url").value,
        highlight_type: document.querySelector("#highlight-type").value
      } 
    }

    fetch('http://localhost:3000/highlights', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(function(res) { console.log(res.json()) })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log(error)
    });
  }
}