class Mascot {
  constructor(mascot) {
    this.id = mascot["id"],
    this.name = mascot["name"]
    this.origin_description = mascot["origin_description"],
    this.cartoon_image_location = mascot["cartoon_image_location"],
    this.real_life_image_location = mascot["real_life_image_location"],
    this.team_id = mascot["team_id"]
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
  
    const currentMascot = Mascot.all[0];
    const currentMascotImage = currentMascot.createMascotElement();
  
    const schoolNameDiv = document.createElement("div");
    schoolNameDiv.id = "mascot-description"
    schoolNameDiv.innerText = `${currentMascot.name}`
    schoolNameDiv.className = "font-bold"
  
    MascotSelectionDiv.insertAdjacentElement("afterbegin", schoolNameDiv);
  
    document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", currentMascotImage)
    currentMascotImage.transitionMascotAndListenForClick();

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
    const currentMascot = document.querySelector(`img[src=${this.cartoon_image_location}]`);
    const mascotId = parseInt(currentMascot.dataset.mascotId)
  
    if (mascotId === Mascot.all.length) {
      document.querySelector("img.mascot-image").remove();
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", Mascot.all[0])
      Mascot.all[0].transitionMascotAndListenForClick() 
      document.querySelector("div#image-counter").innerText = `1/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[0].name}`
    } else {
      const newMascot = Mascot.all[parseInt(this.id) + 1]
      const newMascotImg = newMascot.createMascotElement();
      // remove current mascot image
      document.querySelector("img.mascot-image").remove();
      // add next mascot image to carosel
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg) 
      newMascot.transitionMascotAndListenForClick();
      document.querySelector("div#image-counter").innerText = `${Mascot.all.indexOf(newMascot) + 1}/${Mascot.all.length}`
      document.querySelector("div#mascot-description").innerText = `${Mascot.all[Mascot.all.indexOf(newMascot) + 1].name}`
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
    image.src = this["cartoonImageLocation"]
    image.setAttribute("width", "110px")
    image.setAttribute("data-mascot-id", this["id"])
    image.className = "mascot-image text-center"
  
    return image
  }

  transitionMascotAndListenForClick() {
    const mascotDiv = document.querySelector("div#current-mascot")
    mascotDiv.children[0].addEventListener("mouseenter", e => {
      mascotDiv.style.transform = "translateY(-20px)"
    })
    mascotDiv.children[0].addEventListener("mouseleave", e => {
      mascotDiv.style.transform = ""
    })
    mascotDiv.addEventListener("click", e => {
      showTeamAndMascotDetails(e)
    })
  }
  
}