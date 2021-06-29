class Mascot {
  constructor(mascot) {
    this.id = mascot["id"],
    this.name = mascot["name"]
    this.originDescription = mascot["origin_description"],
    this.cartoonImageLocation = mascot["cartoon_image_location"],
    this.realLifeImage_location = mascot["real_life_image_location"],
    this.teamId = mascot["team_id"]
  }

  static addMascot(mascotData) {
    let mascot = {};
    mascot["id"] = mascotData.id,
    mascot["name"] = mascotData.attributes.name,
    mascot["origin_description"] = mascotData.attributes.origin_description,
    mascot["cartoon_image_location"] = mascotData.attributes.cartoon_image_location,
    mascot["real_life_image_location"] = mascotData.attributes.real_life_image_location,
    mascot["team_id"] = mascotData.attributes.team_id
  
    let newMascot = new Mascot(mascot)
  
    Mascot.all.push(newMascot)
    Team.all.find( element => {return element.id == newMascot["teamId"]}).mascot = newMascot
  }

  static all = [];

  static displayMascotCarosel() {
  
    const MascotSelectionDiv = document.querySelector("div#mascot-selection");
  
    MascotSelectionDiv.innerHTML = `
    <div id="image-counter" class="absolute top-0 left-0"></div>
    <div id="current-mascot" class="relative transition duration-500 cursor-pointer flex w-full h-5/6 items-center justify-center text-center">
    
    </div>
    <a id="previous" class="cursor-pointer absolute top-1/2 p-4 w-auto left-0 text-2xl">&#10094;</a>
    <a id="next" class="cursor-pointer absolute top-1/2 p-4 w-auto right-0 text-2xl">&#10095;</a>
    `
  
    let currentMascot = Mascot.all[0];
    const currentMascotImage = currentMascot.createMascotElement();

    const schoolNameDiv = document.createElement("div");
    schoolNameDiv.id = "mascot-description"
    schoolNameDiv.innerText = `${currentMascot.name}`
    schoolNameDiv.className = "font-bold"
  
    MascotSelectionDiv.insertAdjacentElement("afterbegin", schoolNameDiv);
  
    document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", currentMascotImage)
    currentMascot.transitionMascotAndListenForClick();

    document.querySelector("div#image-counter").innerText = `${Mascot.all.indexOf(currentMascot) + 1}/${Mascot.all.length}`

    const thisTeam = Team.all.find(team => team.id == currentMascot.teamId);
    
    thisTeam.showTeamAndMascotDetails();
  
    function previousMascot() { 
      currentMascot.showPreviousMascot() 
    }

    currentMascotImage.addEventListener("load", function() {
      const next = document.querySelector("a#next")
      const previous = document.querySelector("a#previous")

  
      next.addEventListener("click", () => {
        currentMascot.showNextMascot();
      })
      previous.addEventListener("click", () => {
        currentMascot.showPreviousMascot();
      })
    })
  }
  
  showNextMascot() {
    const a = event.target;
    const aClone = a.cloneNode(true)
    a.parentElement.replaceChild(aClone, a)

    removeTeamDetails();
    hideGameScreen();
  
    if (Mascot.all.indexOf(this) == Mascot.all.length - 1) {
      const newMascot = Mascot.all[0]
      const thisTeam = Team.all.find(team => team.id == newMascot.teamId)

      const newMascotImg = newMascot.createMascotElement();
      // remove current mascot image
      document.querySelector("img.mascot-image").remove();
      // add next mascot image to carosel
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg) 
      newMascot.transitionMascotAndListenForClick();
      document.querySelector("div#image-counter").innerText = `${Mascot.all.indexOf(newMascot) + 1}/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[Mascot.all.indexOf(newMascot)].name}`
      const next = document.querySelector("a#next")

      thisTeam.showTeamAndMascotDetails();
      next.addEventListener("click", () => { Mascot.all[0].showNextMascot() })

      // const firstMascotImage = Mascot.all[0].createMascotElement();
      // document.querySelector("img.mascot-image").remove();
      // document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", firstMascotImage)
      // Mascot.all[0].transitionMascotAndListenForClick() 
      // document.querySelector("div#image-counter").innerText = `1/${Mascot.all.length}`
      // document.querySelector("div#mascot-description").innerText = `${Mascot.all[0].name}`
      // const next = document.querySelector("a#next")
      
    } else {
      const newMascot = Mascot.all[Mascot.all.indexOf(this) + 1]
      const thisTeam = Team.all.find(team => team.id == newMascot.teamId)

      const newMascotImg = newMascot.createMascotElement();
      // remove current mascot image
      document.querySelector("img.mascot-image").remove();
      // add next mascot image to carosel
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg) 
      newMascot.transitionMascotAndListenForClick();
      document.querySelector("div#image-counter").innerText = `${Mascot.all.indexOf(newMascot) + 1}/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[Mascot.all.indexOf(newMascot)].name}`
      const next = document.querySelector("a#next")

      thisTeam.showTeamAndMascotDetails();
      next.addEventListener("click", () => { Mascot.all[parseInt(Mascot.all.indexOf(this) + 1)].showNextMascot() })
    }
  }
  
  showPreviousMascot() {
    const a = event.target;
    const aClone = a.cloneNode(true)
    a.parentElement.replaceChild(aClone, a)
    
    removeTeamDetails();
    hideGameScreen();

    const thisTeam = Team.all.find(team => team.id == this.teamId)

    if (Team.all.indexOf(thisTeam) === 0) {
      const newMascot = Mascot.all[Mascot.all.length - 1]
      const newMascotImg = newMascot.createMascotElement();
      // remove current mascot image
      document.querySelector("img.mascot-image").remove();
      // add next mascot image to carosel
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg) 
      newMascot.transitionMascotAndListenForClick();
      document.querySelector("div#image-counter").innerText = `${Mascot.all.indexOf(newMascot) + 1}/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[Mascot.all.indexOf(newMascot)].name}`
      const previous = document.querySelector("a#previous")
      const teamForThisMascot = Team.all.find(team => team.id == newMascot.teamId)

      teamForThisMascot.showTeamAndMascotDetails();

      previous.addEventListener("click", () => Mascot.all[Mascot.all.length - 1].showPreviousMascot());
    } else {
      const newMascot = Mascot.all[Mascot.all.indexOf(this) - 1]

      const newMascotImg = newMascot.createMascotElement();
      // remove current mascot image
      document.querySelector("img.mascot-image").remove();
      // add next mascot image to carosel
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg) 
      newMascot.transitionMascotAndListenForClick();
      document.querySelector("div#image-counter").innerText = `${Mascot.all.indexOf(newMascot) + 1}/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[Mascot.all.indexOf(newMascot)].name}`
      const previous = document.querySelector("a#previous")
      const teamForThisMascot = Team.all.find(team => team.id == newMascot.teamId)
      teamForThisMascot.showTeamAndMascotDetails();

      previous.addEventListener("click", () => { newMascot.showPreviousMascot() })
    }
  }
  
  createMascotElement() {
    const image = document.createElement("img");

    image.src = this.cartoonImageLocation
    image.setAttribute("width", "100px")
    image.setAttribute("data-mascot-id", this.id)
    image.className = "mascot-image text-center"
  
    return image
  }

  transitionMascotAndListenForClick() {
    const mascotDiv = document.querySelector("div#current-mascot")
    const teamOfThisMascot = Team.all.find( element => { return element.id == this.teamId} )
    mascotDiv.children[0].addEventListener("mouseenter", e => {
      mascotDiv.style.transform = "translateY(-20px)"
    })
    mascotDiv.children[0].addEventListener("mouseleave", e => {
      mascotDiv.style.transform = ""
    })
    mascotDiv.addEventListener("click", e => {
      teamOfThisMascot.showTeamAndMascotDetails()
    })
  }

  peepMascot() {
    if (gameDetails.totalRivals < gameDetails.mascotsToBeWacked) {
      const mascotDivs = document.querySelectorAll(".mascot-div")
      const randomMascotDiv = getRandomMascotDiv();
      
      const mascotImage = gameDetails.gameMascot.createMascotElement();
      mascotImage.className += " absolute bottom-0 transition duration-200 left-10"
  
      randomMascotDiv.appendChild(mascotImage)
    
      mascotImage.addEventListener("load", () => {
        updateTotalRivals();
        mascotImage.addEventListener("click", function() {
          updateRivalsWacked();
        })
  
        if (allChildrenComplete(randomMascotDiv)) {
          mascotImage.style.transform = "translateY(-105px)";
        
          let randomTime = randomInteger(gameDetails.randomTimeMin, gameDetails.randomTimeMax)
        
          setTimeout(function() {
            mascotImage.remove();
            gameDetails.gameMascot.peepMascot();
          }, randomTime)
        } else {
          mascotImage.style.transform = "translateY(-105px)";
      
          let randomTime = randomInteger(gameDetails.randomTimeMin, gameDetails.randomTimeMax)
      
          setTimeout(function() {
            mascotImage.remove();
            gameDetails.gameMascot.peepMascot();
            inGameMascotCounter++
          }, randomTime)
        }
      })
    } else {

      determineGameWinner();

      setTimeout(function() {
        const gameScreen = document.querySelector("div#game-screen");
        
        while (gameScreen.lastElementChild) {
          gameScreen.lastElementChild.remove();
        }
  
        displayWinner();
        Highlight.getHighlightMedia();
  
        
        setTimeout(function() {
          displayResultsAndMedia();
    
          setTimeout(function() {
            // clear highlights from game details
            gameDetails.winHighlights = []
            gameDetails.lossHighglights = [] 
            document.querySelector("div#main-div").classList.remove("hidden");
            document.querySelector("div#landing-div").classList.remove("hidden");
            window.scrollTo(0, document.body.scrollHeight)

            setTimeout(function() {
              window.scrollTo({
                top: document.querySelector("div#main-div").scrollHeight,
                left: 0,
                behavior: 'smooth'
              })
              let position = null
              const checkIfScrollIsStatic = setInterval(() => {
                if (position === window.scrollY) {
                  clearInterval(checkIfScrollIsStatic)
                  gameScreen.className += " hidden"
                  resetGameScreen();
                }
                position = window.scrollY
              }, 50)
            }, 500)
          }, 8000)
        }, 8000)
      }, 4500)
    }
  }
}
