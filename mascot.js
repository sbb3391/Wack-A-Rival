class Mascot {
  constructor(mascot) {
    this.id = mascot["id"],
    this.name = mascot["name"]
    this.origin_description = mascot["origin_description"],
    this.cartoon_image_location = mascot["cartoon_image_location"],
    this.real_life_image_location = mascot["real_life_image_location"],
    this.team_id = mascot["team_id"]
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
    Team.all.find( element => {return element.id == newMascot["team_id"]}).mascot = newMascot
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
    removeTeamDetails();
    hideGameScreen();
  
    if (Mascot.all.indexOf(this) == Mascot.all.length - 1) {
      const firstMascotImage = Mascot.all[0].createMascotElement();
      document.querySelector("img.mascot-image").remove();
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", firstMascotImage)
      Mascot.all[0].transitionMascotAndListenForClick() 
      document.querySelector("div#image-counter").innerText = `1/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[0].name}`
      const next = document.querySelector("a#next")
      next.addEventListener("click", () => { Mascot.all[0].showNextMascot() })
    } else {
      const newMascot = Mascot.all[Mascot.all.indexOf(this) + 1]
      const newMascotImg = newMascot.createMascotElement();
      // remove current mascot image
      document.querySelector("img.mascot-image").remove();
      // add next mascot image to carosel
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg) 
      newMascot.transitionMascotAndListenForClick();
      document.querySelector("div#image-counter").innerText = `${Mascot.all.indexOf(newMascot) + 1}/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[Mascot.all.indexOf(newMascot)].name}`
      const next = document.querySelector("a#next")
      next.addEventListener("click", () => { Mascot.all[parseInt(Mascot.all.indexOf(this) + 1)].showNextMascot() })
    }
  }
  
  showPreviousMascot(e) {
    const currentMascot = e.target.parentElement.querySelector("img");
    const mascotId = parseInt(currentMascot.dataset.mascotId)
  
    if (mascotId === 1) {
      document.querySelector("img.mascot-image").remove();
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", mascotImagesArray[mascotImagesArray.length - 1]) 
      document.querySelector("div#image-counter").innerText = `${mascotImagesArray.length}/${mascotImagesArray.length}`
    } else {
      // remove current mascot image
      currentMascot.remove();
      // add next mascot image to carosel
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", mascotImagesArray[parseInt(mascotId) - 1]) 
      document.querySelector("div#image-counter").innerText = `${mascotId-1}/${mascotImagesArray.length}`
    }
  }
  
  createMascotElement() {
    const image = document.createElement("img");

    image.src = this.cartoon_image_location
    image.setAttribute("width", "110px")
    image.setAttribute("data-mascot-id", this.id)
    image.className = "mascot-image text-center"
  
    return image
  }

  transitionMascotAndListenForClick() {
    const mascotDiv = document.querySelector("div#current-mascot")
    const teamOfThisMascot = Team.all.find( element => { return element.id == this.team_id} )
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
    console.log("InGame:", inGameMascotCounter, "total Mascots:", totalMascots)
    if (inGameMascotCounter <= totalMascots) {
      const mascotDivs = document.querySelectorAll(".mascot-div")
      const randomMascotDiv = getRandomMascotDiv();
      
      const mascotImage = gameMascot.createMascotElement();
      mascotImage.className += " absolute bottom-0 transition duration-200 left-10"
  
      randomMascotDiv.appendChild(mascotImage)
    
      mascotImage.addEventListener("load", () => {
        mascotImage.addEventListener("click", function() {
          updateScoreboard();
        })
  
        if (allChildrenComplete(randomMascotDiv)) {
          mascotImage.style.transform = "translateY(-105px)";
        
          let randomTime = randomInteger(600, 900)
        
          setTimeout(function() {
            mascotImage.remove();
            gameMascot.peepMascot();
          }, randomTime)
        } else {
          mascotImage.style.transform = "translateY(-105px)";
      
          let randomTime = randomInteger(600, 900)
      
          setTimeout(function() {
            mascotImage.remove();
            gameMascot.peepMascot();
            inGameMascotCounter++
          }, randomTime)
        }
      })
    } else {
      const gameScreen = document.querySelector("div#game-screen");
      while (gameScreen.lastElementChild) {
        gameScreen.lastElementChild.remove();
      }

      displayResultsAndMedia();

      setTimeout(function() {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        gameScreen.className += " hidden"
      }, 15000)
    }
  }
}
