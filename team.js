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
    
    // function displayMascotCarosel(json) {
    //   mascotObjects = json.included
    //   teamObjects = json.data
      
    //   mascotImagesArray = mascotObjects.map( mascotObject => { return createMascotElement(mascotObject) })
    
    //   const MascotSelectionDiv = document.querySelector("div#mascot-selection");
    
    //   MascotSelectionDiv.innerHTML = `
    //   <div id="image-counter" class="absolute top-0 left-0"></div>
    //   <div id="current-mascot" class="relative transition duration-500 cursor-pointer flex w-full h-5/6 items-center justify-center text-center">
      
    //   </div>
    //   <a id="previous" class="cursor-pointer absolute top-1/2 p-4 w-auto left-0 text-2xl">&#10094;</a>
    //   <a id="next" class="cursor-pointer absolute top-1/2 p-4 w-auto right-0 text-2xl">&#10095;</a>
    //   `
    
    //   let currentMascotImage = mascotImagesArray[0];
    
    //   const schoolNameDiv = document.createElement("div");
    //   schoolNameDiv.id = "mascot-description"
    //   schoolNameDiv.innerText = `${mascotObjects[0].attributes.name}`
    //   schoolNameDiv.className = "font-bold"
    
    //   MascotSelectionDiv.insertAdjacentElement("afterbegin", schoolNameDiv);
    
    //   document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", currentMascotImage)
    //   transitionMascotAndListenForClick();
    //   document.querySelector("div#image-counter").innerText = `${mascotImagesArray.indexOf(currentMascotImage) + 1}/${mascotImagesArray.length}`
    
    //   currentMascotImage.addEventListener("load", function() {
    //     const next = document.querySelector("a#next")
    //     const previous = document.querySelector("a#previous")
    
    //     next.addEventListener("click", function() {
    //       showNextMascot(event)
    //     })
    //     previous.addEventListener("click", function() {
    //       showPreviousMascot(event)
    //     })
    //   })
    // }
}