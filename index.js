const mascotImages = document.querySelector("template#mascot-images").content.children;
let previousMascotBottom, previousMascotLeft, previousMascotDiv
let gameDetails = {
  gameMascot: "",
  mascotsToBeWacked: 5,
  winHighlights: [],
  lossHighlights: [],
  scoreboard: 0,
  winner: ""
}

function getRandomMascot() {
  randomMascot = mascotImages[Math.floor(Math.random()*mascotImages.length)].cloneNode(true);
  mascotDiv = document.createElement("div")
  mascotDiv.innerHTML = `
    <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative z-10">
  `

  assignMascotTopAndBottom();

  mascotDiv.className = `absolute`

  document.querySelector("#mascots-div").appendChild(mascotDiv)
  randomMascot.className = "mascot absolute bottom-10 z-0 left-10 transition duration-200"
  mascotDiv.appendChild(randomMascot)
}

function randomArrayIndex(elementsArray) {
  const max = elementsArray.length;
  return Math.floor(Math.random() * max);
}

function randomInteger(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomMascotDiv() {
  let previousMascotDivIndex = Array.from(document.querySelectorAll(".mascot-div")).indexOf(previousMascotDiv)
  previousMascotDivIndex = -1 ? previousMascotDivIndex = undefined : nil

  const mascotDivElements = document.querySelectorAll(".mascot-div")
  let getRandomMascotDiv = mascotDivElements[randomArrayIndex(mascotDivElements)] 

  while (getRandomMascotDiv === previousMascotDiv) {
    getRandomMascotDiv = mascotDivElements[randomArrayIndex(mascotDivElements)] 
  }

  previousMascotDiv = getRandomMascotDiv;

  return getRandomMascotDiv
}

function translateMascotUp(mascot, div) {
  if (allChildrenComplete(div)) {
    mascot.style.transform = "translateY(-105px)";

    let randomTime = randomInteger(500, 600)
    console.log("random time", randomTime)

    setTimeout(function() {
      div.remove();
      peepMascot();
    }, randomTime)
  } else {
    mascot.addEventListener("load", () => {
      mascot.style.transform = "translateY(-105px)";

      let randomTime = randomInteger(500, 600)
      console.log("random time", randomTime)
  
      setTimeout(function() {
        div.querySelector(".mascot-image").remove();
      }, randomTime)
    })
  }
}

function assignMascotTopAndBottom(mascotDiv) {
  // check if mascot bottom value is too close to the previous value. We don't want them popping up right next to each other
  let mascotBottom = randomInteger(0, 40)

  while (Math.abs(mascotBottom - previousMascotBottom) < 10) {
    mascotBottom = randomInteger(0, 40)
  }

  mascotDiv.style.bottom = mascotBottom + "%";
  previousMascotBottom = mascotBottom

  // check the same way for mascot left value
  let mascotLeft = randomInteger(0, 75)

  while (Math.abs(mascotLeft- previousMascotLeft) < 20 ) {
    mascotLeft = randomInteger(0, 75)
  }

  mascotDiv.style.left = mascotLeft + "%";
  previousMascotLeft = mascotLeft

  return mascotDiv;
}

function updateScoreboard() {
  gameDetails.scoreboard += 1
  displayScore();
}

function displayScore() {
  let score = document.querySelector("div#scoreboard").querySelector("span");
  score.innerText = gameDetails.scoreboard;
}

function countDownToStartGame(mascot) {
  gameDetails.gameMascot = mascot;
  gameDetails.gameTeam = Team.all.find(element => element.id == mascot.team_id)
  const scoreboard = document.querySelector("div#scoreboard");
  const gameScreen = document.querySelector("div#game-screen");
  
  populateMascotsDiv();
  gameScreen.classList.remove("hidden")

  scoreboard.insertAdjacentElement("beforeEnd", createCountDownClockElement(5));
  const countDownClock = document.querySelector("div#countdown-clock")
  const numberDiv = countDownClock.querySelector("div#number-div")

  window.scrollTo({
    top: gameScreen.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });

  let position = null
  const checkIfScrollIsStatic = setInterval(() => {
    if (position === window.scrollY) {
      clearInterval(checkIfScrollIsStatic)
      document.querySelector("div#main-div").className += " hidden"
      numberDiv.addEventListener("load", startCountDownClock(numberDiv))
    }
    position = window.scrollY
  }, 50)
}

function startGame(mascotsToBeWacked = 20) {
  inGameMascotCounter = 0;
  totalMascots = mascotsToBeWacked

  gameDetails.gameMascot.peepMascot();

}

function startCountDownClock(numberDiv) {

  let countDownTimer = numberDiv.innerText

  const countDownVar = setInterval(() => {

    countDownTimer -- 
    numberDiv.style.transform = "translateX(35px)"

    numberDiv.addEventListener("transitionend", function() {
      
      numberDiv.innerText = countDownTimer
      numberDiv.style.transform = ""
    })

    if (parseInt(countDownTimer) === 0) {
      clearInterval(countDownVar);
      document.querySelector("div#countdown-clock").remove()
      startGame(5);
    } 
  }, 1000)
}

function createCountDownClockElement(initialValue) {
  const countDownClock = document.createElement("div")

  countDownClock.id = "countdown-clock"
  countDownClock.className = "inline-block w-full absolute bottom-1/4"
  countDownClock.innerHTML = `
    <div class="w-6 overflow-hidden mx-auto">
      <div id="number-div" class="transition duration-200">${initialValue}</div>
    </div>
  `
  return countDownClock;
}

function stopPeep() {
  alert("game Over!")
}

window.addEventListener("DOMContentLoaded", () => {
  Team.getAllTeams();
})

// function showMascots() {
//   const mascots = document.querySelector("template#mascot-images").content.children;

//   Array.from(mascots).forEach( mascot => {
//     let mascotClone = mascot.cloneNode(true);
//     mascotClone.className =""
//     mascotClone.style.width = "75px"

//     let mascotDiv = document.createElement("div");
//     mascotDiv.className = "py-12 h-20 mascots transition duration-500 cursor-pointer"
//     mascotDiv.dataset.MascotId = mascotClone.dataset.mascotId

//     mascotDiv.appendChild(mascotClone);

//     document.querySelector("div#mascot-selection").appendChild(mascotDiv);
//   })

//   for (const mascot of document.querySelectorAll(".mascots")) {
//     mascot.addEventListener("mouseenter", e => {
//       e.target.style.transform = "translateY(-30px)"
//     })
//     mascot.addEventListener("mouseleave", e => {
//       e.target.style.transform = ""
//     })
//     mascot.addEventListener("click", e => {
//       showMascotInfo(e.target.dataset.mascotId)
//     })
//   }
// }

  function removeTeamDetails() {
    const teamDetail = document.querySelector("div#team-detail")
    if (teamDetail) {
      teamDetail.remove();
    }
  }

  function createMascotCopy(mascot) {
    const copySrc = mascot.src
    const copyWidth = "90px"
    const copy = document.createElement("img")

    copy.style.width = copyWidth;
    copy.src = copySrc;

    return copy
  }

  function hideGameScreen() {
    document.querySelector("div#game-screen").classList.add("hidden");
  }

  function allChildrenComplete(div) {
    
    Array.from(div.children).every( element => {
      return element.complete;
    })
  }

  function displayResultsAndMedia() {
    // const gameScreen = document.querySelector("div#game-screen")
    // const resultsDiv = document.createElement("div")

    // resultsDiv.className = "w-5/6 h-full mx-auto my-auto text-center flex-col"
    // resultsDiv.innerHTML = `
    //   <div class="w-full h-1/6">
    //     <p class="text-2xl text-center">Bully Wins!</p>
    //   <div>
    //   <div class="w-full h-5/6 text-center flex place-self-center">
    //     <img src="./gifs/Cringe3.gif">
    //   <div>
    // `

    // gameScreen.appendChild(resultsDiv)

    const  gameScreen = document.querySelector("div#game-screen");

    const winOrLossHighlight = function() {
      if (gameDetails.winner === "Arkansas") {
        const teamLossHighlights = gameDetails.lossHighlights;
        return teamLossHighlights[randomArrayIndex(teamLossHighlights)]
      }
      else {
        const teamWinHighlights = gameDetails.winHighlights;
        return teamWinHighlights[randomArrayIndex(teamWinHighlights)]
      }
    }
    const highlight = winOrLossHighlight();

    while (gameScreen.lastElementChild) {
      gameScreen.lastElementChild.remove();
    }
  
    const winner = document.createElement("div")
    winner.className = "w-full h-full flex items-center justify-center"
    winner.innerHTML = `
      <div class="w-3/4 h-4/5 text-center">
        <div class="text-lg my-12 w-1/2">${highlight.description}</div>
        ${highlight.mediaUrl}
      </div>
    `
  
    gameScreen.insertAdjacentElement("beforeEnd", winner);
    debugger;
  }

  function populateMascotsDiv() {
    const mascotsDiv = document.querySelector("div#mascots-div");

    mascotsDiv.innerHTML = `
    <div class="flex w-full h-1/2 justify-around relative">
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10 ">
      </div>
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10">
      </div>
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10">
      </div>
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10">
      </div>
    </div>
    <div class="flex w-full h-1/2 relative justify-around">
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-14 z-10">
      </div>
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-14 z-10">
      </div>
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-14 z-10">
      </div>
      <div class="mascot-div relative bottom-0">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-14 z-10">
      </div>
    </div>
  `
}

function resetGameScreen() {
  const gameScreen = document.querySelector("div#game-screen");

  gameScreen.innerHTML = `
    <div id="scoreboard" class="h-1/6 relative">
      <h1 class="text-center pt-7">Current Rivals Wacked: <span></span> </h1>
    </div>
    <div id="mascots-div" class="mx-auto w-10/12 z-10 h-4/5 border-2 border-black rounded-md flex flex-col">
    </div>
  `

  gameDetails.scoreboard = 0;
}

function displayWinner() {
  const  gameScreen = document.querySelector("div#game-screen");
  
  const winner = document.createElement("div")
  winner.className = "w-full h-full flex items-center justify-center"
  winner.innerHTML = `
    <div class="w-3/4 h-4/5 text-center">
      <p class="text-2xl">${gameDetails.gameTeam.shorthandName} Wins</p>
      <img class="mx-auto" src="./gifs/Cringe3.gif" width=800px>
    </div>
  `

  gameScreen.insertAdjacentElement("beforeEnd", winner);
}

function displayHighlights() {
  const highlightsDiv = document.createElement("div");
  const backgroundDiv = document.createElement("div");

  backgroundDiv.className = "w-5/6 h-5/6 bg-blue-100 flex justify-center align-center place-items-center space-x-8"
  highlightsDiv.className = "w-5/12 h-5/6 bg-red-100"

  highlightsDiv.innerHTML = `
    <ul>
    </ul>
  `

  

  backgroundDiv.appendChild(highlightsDiv);
  document.querySelector("div#form-background-div").appendChild(backgroundDiv); 
  document.querySelector("div#main-div").className += ' filter blur-md'
  document.querySelector("div#form-background-div").classList.remove("hidden")
}



