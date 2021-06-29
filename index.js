const mascotImages = document.querySelector("template#mascot-images").content.children;
let previousMascotBottom, previousMascotLeft, previousMascotDiv
let gameDetails = {
  gameMascot: "",
  mascotsToBeWacked: 5,
  winHighlights: [],
  lossHighlights: [],
  scoreboard: 0,
  totalRivals: 0,
  winner: "",
  winnerImages: [],
  randomTimeMin: 800,
  randomTimeMax: 1200
}

window.addEventListener("DOMContentLoaded", () => {
  Team.getAllTeams();
  document.querySelector("#highlight-button").addEventListener("click", Highlight.displayHighlights)
  document.querySelector("#new-highlight-button").addEventListener("click", Highlight.addANewHighlight)
})


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

function updateRivalsWacked() {
  gameDetails.scoreboard ++
  displayRivalsWacked();
}

function updateTotalRivals() {
  gameDetails.totalRivals ++
  displayTotalRivals();
}

function displayRivalsWacked() {
  let score = document.querySelector("span#rivals-wacked");
  score.innerText = gameDetails.scoreboard;
}

function displayTotalRivals() {
  let totalRivals = document.querySelector("span#total-rivals");
  totalRivals.innerText = gameDetails.totalRivals;
}

function countDownToStartGame(mascot) {
  gameDetails.gameMascot = mascot;
  gameDetails.gameTeam = Team.all.find(element => element.id == mascot.teamId)
  const scoreboard = document.querySelector("div#scoreboard");
  const gameScreen = document.querySelector("div#game-screen");
  
  populateMascotsDiv();
  gameScreen.classList.remove("hidden")

  scoreboard.insertAdjacentElement("beforeEnd", createCountDownClockElement(5));
  const countDownClock = document.querySelector("div#countdown-clock")
  const numberDiv = countDownClock.querySelector("div#number-div")

  setTimeout(function() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
 
    let position = null
    const checkIfScrollIsStatic = setInterval(() => {
      if (position === window.scrollY) {
        clearInterval(checkIfScrollIsStatic)
        document.querySelector("div#main-div").className += " hidden"
        document.querySelector("div#landing-div").className += " hidden"
        numberDiv.addEventListener("load", startCountDownClock(numberDiv))
      }
      position = window.scrollY
    }, 50)
  },500)
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

  function removeTeamDetails() {
    const teamDetail = document.querySelector("div#team-detail")
    if (teamDetail) {
      while (teamDetail.lastElementChild) {
        teamDetail.lastElementChild.remove();
      }

    }

    if (document.querySelector("#team-and-button")) {
      document.querySelector("#team-and-button").remove();
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
      <div class="w-3/4 h-4/5 flex flex-col space-y-10 text-center justify-center place-items-center">
        <div class="text-lg w-1/2">${highlight.description}</div>
        <div>${highlight.mediaUrl}</div>
      </div>
    `
  
    gameScreen.insertAdjacentElement("beforeEnd", winner);
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
      <h1 class="text-center pt-7">Rivals Wacked: <span id="rivals-wacked">0</span><span>/</span><span id="total-rivals">0</span> </h1>
    </div>
    <div id="mascots-div" class="mx-auto w-10/12 z-10 h-4/5 border-2 border-black rounded-md flex flex-col">
    </div>
  `

  gameDetails.scoreboard = 0;
  gameDetails.totalRivals = 0;
}

function displayWinner() {
  const  gameScreen = document.querySelector("div#game-screen");
  
  const winner = document.createElement("div")
  winner.className = "w-full h-full flex items-center justify-center"
  winner.innerHTML = `
    <div class="w-3/4 h-4/5 text-center">
      <p class="text-2xl">${gameDetails.winner} Wins</p>
      <img class="mx-auto" src="./gifs/Cringe2.gif" width=800px>
    </div>
  `

  gameScreen.insertAdjacentElement("beforeEnd", winner);
}

function showHighlightDetails() {
  const highlightId = event.target.dataset.highlightId

  fetch(`http://localhost:3000/highlights/${highlightId}`)
  .then(resp => resp.json())
  .then(json => displayHighlightDetails(json))
}

function displayHighlightDetails(json) {
  const highlight = Highlight.createHighlight(json.data) 
  const highlightTeamsDiv = document.querySelector("div#highlight-teams")

  const highlightDiv = document.createElement("div");
  highlightDiv.className = "w-full h-full bg-gray-200 flex z-10 absolute justify-around"
  highlightDiv.id = "highlight-div"
  highlightDiv.innerHTML = `
    <div class="w-1/2 h-full flex flex-col space-y-1">
      <div>DATE</div>
      <div class="w-full flex space-x-4">
        <label class="w-32">Description:</label>
        <textarea class="resize-none border-none bg-gray-200 w-11/12 focus:outline-none" disabled="true" rows="7">${highlight.description}</textarea>
      </div>
      <div class="w-full flex space-x-4">
        <label class="w-32">Media URL:</label>
        <textarea class="resize-none border-none bg-gray-200 w-11/12 focus:outline-none" disabled="true" rows="7">${highlight.mediaUrl}</textarea>
      </div>
      <div class="w-full flex space-x-4">
        <label class="w-32">Win/Loss:</label>
        <input class="border-none bg-gray-200 w-11/12 focus:outline-none" disabled="true" value='${highlight.highlightType}'>
      </div>
    </div>
    <div class="w-1/2 flex justify-center place-items-center relative">
      <span class="absolute pr-1 right-0 top-0 cursor-pointer">&#88;</span>
      <div id="highlight-iframe">${highlight.mediaUrl}</div>
    </div>
  `

  highlightTeamsDiv.parentElement.appendChild(highlightDiv)
  const iframe = document.querySelector("div#highlight-iframe").firstElementChild
  iframe.width = "600"
  iframe.height = "350"

  iframe.parentElement.previousElementSibling.addEventListener("click", function() {
    document.querySelector("div#highlight-div").remove();
  })
}

function createHighlightsDiv() {
  const highlightsDiv = document.createElement("div");
  highlightsDiv.className = "w-5/12 h-5/6 flex flex-col bg-gray-200 space-y-3 relative"
  return highlightsDiv
}

function determineGameWinner() {
  if (gameDetails.scoreboard >= (gameDetails.totalRivals/2)) {
    gameDetails.winner = "Arkansas"
  } else {
    gameDetails.winner = Team.all.find(team => team.id == gameDetails.gameMascot.team_id).shorthandName
  }
}

function displayGameSettings() {
  const newDiv = document.createElement("div")

  newDiv.className = "flex flex-col space-y-2 w-1/3 mx-auto justify-center mt-8 border-black border-2 rounded-md pt-2"
  newDiv.id = "game-settings"
  newDiv.innerHTML = `
    <h1 class="text-center">Difficulty Level:</h1>
    <div id="radio-div" class="flex flex-col justify-center place-items-center space-y-1 p-3">
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="1"><label>Walk On</label>
      </div>
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="2"><label>Starter</label>
      </div>
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="3"><label>All Conference</label>
      </div>
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="4"><label>All American</label>
      </div>
      <div>
        <button class="bg-blue-400 text-white w-48 h-6 border rounded-md" id="go-button">Go</button>
      </div>
    </div>
  `

  document.querySelector("#team-and-button").parentElement.appendChild(newDiv);
  
  const goBtn = document.querySelector("#go-button");
  const mascot = Mascot.all.find(mascot => mascot.name == document.querySelector("#mascot-description").innerText)

  goBtn.addEventListener("click", function() {
    const selectedDifficulty = document.querySelector("#radio-div").querySelector("input:checked").dataset.difficulty;
    updateGameDetailDifficultySettings(selectedDifficulty);
    countDownToStartGame(mascot);
    setTimeout(function() {
      newDiv.remove();
    }, 1000);
  })
}

function updateGameDetailDifficultySettings(difficulty) {
  switch(difficulty) {
    case "1":
      gameDetails.mascotsToBeWacked = 5;
      gameDetails.randomTimeMin = 900;
      gameDetails.randomTimeMax = 1400;
      break;
    case "2":
      gameDetails.mascotsToBeWacked = 10;
      gameDetails.randomTimeMin = 800;
      gameDetails.randomTimeMax = 1200;
      break;
    case "3":
      gameDetails.mascotsToBeWacked = 15;
      gameDetails.randomTimeMin = 700;
      gameDetails.randomTimeMax = 1100;
      break;
    case "4":
      gameDetails.mascotsToBeWacked = 20;
      gameDetails.randomTimeMin = 600;
      gameDetails.randomTimeMax = 950;
      break;
  }
}

