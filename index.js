// // configuring cors in npm
// const express = require("express")
// const cors = require("cors");
// const app = express();

// app.use(cors({
//   origin : true,
//   credentials: true // <= Accept credentials (cookies) sent by the client
// }))

// app.use("/api/whatever/the/endpoint", yourRouter);

// // 

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
  document.querySelector("#highlights-button").addEventListener("click", Highlight.displayHighlights)
  document.querySelector("#new-highlight-button").addEventListener("click", Highlight.addANewHighlight)
  Team.getAllTeams();
  determineIfLoggedIn();
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

  function removeGameSettings() {
    const gameSettings = document.querySelector("div#game-settings")
    gameSettings ? gameSettings.remove() : null
  }

  function removeTeamDetails() {
    const teamDetail = document.querySelector("#team-detail");
    teamDetail.firstElementChild ? teamDetail.firstElementChild.remove() : null
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
      <div class="mascot-div relative bottom-0 select-none">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10 ">
      </div>
      <div class="mascot-div relative bottom-0 select-none">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10">
      </div>
      <div class="mascot-div relative bottom-0 select-none">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10">
      </div>
      <div class="mascot-div relative bottom-0 select-none">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-16 z-10">
      </div>
    </div>
    <div class="flex w-full h-1/2 relative justify-around">
      <div class="mascot-div relative bottom-0 select-none">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-14 z-10">
      </div>
      <div class="mascot-div relative bottom-0 select-none">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-14 z-10">
      </div>
      <div class="mascot-div relative bottom-0 select-none">
        <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative top-14 z-10">
      </div>
      <div class="mascot-div relative bottom-0 select-none">
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
    <div class="w-1/4 h-full flex flex-col space-y-1">
      <div>DATE</div>
      <div class="w-full flex space-x-4">
        <label class="w-24">Description:</label>
        <textarea class="resize-none border-none bg-gray-200 w-5/6 focus:outline-none" disabled="true" rows="9">${highlight.description}</textarea>
      </div>
      <div class="w-full flex space-x-4">
        <label class="w-24">Media URL:</label>
        <textarea class="resize-none border-none bg-gray-200 w-5/6 focus:outline-none" disabled="true" rows="9">${highlight.mediaUrl}</textarea>
      </div>
      <div class="w-full flex space-x-4">
        <label class="w-24">Win/Loss:</label>
        <input class="border-none bg-gray-200 w-5/6 focus:outline-none" disabled="true" value='${highlight.highlightType}'>
      </div>
    </div>
    <div class="w-1/3 flex justify-center place-items-center relative">
      <div id="highlight-iframe">${highlight.mediaUrl}</div>
    </div>
    <div class="w-1/4 flex flex-col">
      <div class="h-1/3 w-full border-b-4 border-black rounded-sm">
        <form>
          <div class="w-full flex flex-col mt-4 space-y-2">
            <div class="w-full h-1/4">
              <textarea class="block mx-auto resize-none border-black border-2 bg-gray-200 w-11/12 px-1 rounded-md placeholder-gray-500 placeholder-opacity-100" placeholder="leave your comment..." rows="5"></textarea>
            </div>
            <div class="text-center">
              <input type="submit" value="Add Comment" class="bg-blue-400 font-white text-sm w-36 h-6 rounded-md whitespace-normal">
            </div>
          </div>
        <form>
      </div>
      <div id="comments-div" class="w-full flex flex-col overflow-auto pl-3">
      </div>
    </div>
    <span class="absolute right-0 top-0 cursor-pointer pr-3">&#88;</span>
  `

  highlightDiv.style.marginLeft = "0px"


  highlightTeamsDiv.parentElement.appendChild(highlightDiv)
  const iframe = document.querySelector("div#highlight-iframe").firstElementChild
  iframe.width = "550"
  iframe.height = "350"

  // listener for X button to close out highlight window
  iframe.parentElement.parentElement.parentElement.querySelector("span").addEventListener("click", function() {
    document.querySelector("div#highlight-div").remove();
  })

  // adding comments
  HighlightComment.getAllCommentsSortedNewestToOldest(json.included)

  HighlightComment.all.forEach( comment => {
    debugger;
    let newCommentDiv = document.createElement("div")
    newCommentDiv.dataset.userId = comment.userId
    newCommentDiv.className = "w-3/4 border-b-2 border-black flex flex-col space-y-1 p-2"
    newCommentDiv.innerHTML = `
      <span class="text-xs">${comment.username} says...</span>
      <p class="text-md">${comment.commentText}</p>
    `

    document.querySelector("div#comments-div").appendChild(newCommentDiv)
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
    gameDetails.winner = Team.all.find(team => team.id == gameDetails.gameMascot.teamId).shorthandName
  }
}

function displayGameSettings() {
  const newDiv = document.createElement("div")

  newDiv.className = "flex flex-col space-y-2 w-5/6 h-1/3 mx-auto justify-around border-black border-2 rounded-md"
  newDiv.id = "game-settings"
  newDiv.innerHTML = `
    <h1 class="text-center italic">Difficulty Level:</h1>
    <div id="radio-div" class="flex justify-around place-items-center mb-2">
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="1" checked><label>Walk On</label>
      </div>
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="2"><label>Starter</label>
      </div>
    </div>
    <div class="flex justify-around place-items-center space-y-1">
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="3"><label>All Conference</label>
      </div>
      <div>
        <input type="radio" name="difficulty-level" data-difficulty="4"><label>All American</label>
      </div>
    </div>
    <div class="flex space-x-1 w-full justify-around" id="highlight-selection-options">
      <div class="flex flex-col justify-center w-5/12">
        <label class="text-center italic">Win Highlight<label>
        <select id="win-highlight" class="border-black border-2 rounded-md bg-gray-200 w-full text-md">
          <option value="random" selected>Random</option>
        </select>
      </div>
      <div class="flex flex-col justify-center w-5/12">
        <label class="text-center italic">Loss Highlight</label>
        <select id="loss-highlight" class="border-black border-2 rounded-md bg-gray-200 w-full text-md">
          <option value="random" selected>Random</option>
        </select>
      </div>
    </div>
    <div class="self-center">
      <button class="self-center bg-blue-400 text-white w-48 h-8 border rounded-md" id="go-button">Go</button>
    </div>
  `

  document.querySelector("#mascot-selection").insertAdjacentElement("afterend", newDiv);
  
  const goBtn = document.querySelector("#go-button");
  const mascot = Mascot.all.find(mascot => mascot.name == document.querySelector("#mascot-description").innerText)

  // const chooseRadio = document.querySelector("#game-settings").querySelector("input[value='choose']")
  // chooseRadio.addEventListener("click", showHighlightSelectionOptions)

  goBtn.addEventListener("click", function() {
    const selectedDifficulty = document.querySelector("#game-settings").querySelector("input:checked").dataset.difficulty;
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

function showOpponentInformation() {
  const mainDiv = document.querySelector("#main-div")
  mainDiv.classList.remove("hidden");

  window.scrollTo({
    top: mainDiv.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });
}

function determineIfLoggedIn() {
  const token = localStorage.token
  if (token) {
    fetch("http://localhost:3000/sessions/autologin", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(function(json) {
      showUserLoggedIn(json.data)
      document.querySelector("#highlight-buttons-div").classList.remove("hidden")
      showChooseMascotButton()
    })
  } else {
    forceUserLogin();
  }
}

function forceUserLogin() {
  const chooseOpponentParent = document.querySelector("#choose-opponent").parentElement;

  const loginButton = chooseOpponentParent.firstElementChild.cloneNode(true);
  loginButton.innerText = "Login"

  chooseOpponentParent.firstElementChild.replaceWith(loginButton)

  loginButton.addEventListener("click", launchLoginForm)
}

function launchLoginForm() {
  document.querySelector("#new-user-div") ? removeNewUserForm() : null

  const backgroundDiv = document.createElement("div");
  const loginDiv = createLoginDiv();

  backgroundDiv.id = "background-div"
  backgroundDiv.className = "w-5/6 h-auto bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative"
  loginDiv.id = "login-div"

  loginDiv.innerHTML = `
    <h1 class="w-3/4 text-center">Login Form</h1>
    <form id="login-form">
      <div class="flex flex-col space-y-7">
        <div class="w-full flex flex-col ">
          <label class="mx-4">Username</label>
          <input type="text" id="username" class="text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md">
          </select>
        </div>
        <div class="w-full flex flex-col">
          <label class="mx-4">Password</label>
          <input type="password" id="password" class="text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md">
        </div>
        <div class="flex place-items-center justify-center pb-5">
          <input type="submit" value="Login" class="bg-blue-400 font-white w-36 h-10 rounded-md whitespace-normal">
        </div> 
      <div>
    <span class="underline text-blue-700 cursor-pointer" id="go-to-new-user">Don't have an account?</span>
    
  `

    const newSpan = document.createElement("span");
    newSpan.innerHTML = "&#88;"
    newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1"
    loginDiv.insertAdjacentElement("afterbegin", newSpan)
  
  newSpan.addEventListener("click", function() {
    removeLoginForm();
  })

  backgroundDiv.appendChild(loginDiv);
  document.querySelector("div#form-background-div").appendChild(loginDiv); 
  document.querySelector("div#landing-div").className += ' filter blur-md'
  document.querySelector("div#form-background-div").classList.remove("hidden")

  document.querySelector("form#login-form").addEventListener("submit", submitLoginForm)
  document.querySelector("#go-to-new-user").addEventListener("click", launchNewUserForm)
}

function launchNewUserForm() {
  removeLoginForm();
  const backgroundDiv = document.createElement("div");
  const loginDiv = createLoginDiv();

  backgroundDiv.id = "background-div"
  backgroundDiv.className = "w-5/6 h-auto bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative"
  loginDiv.id = "new-user-div"

  loginDiv.innerHTML = `
    <h1 class="w-3/4 text-center">New User Form</h1>
    <form id="new-user-form" class="h-full">
      <div class="flex flex-col h-full space-y-2">
        <div class="w-full flex flex-col relative h-1/6">
          <label class="mx-4">Username</label>
          <input type="text" id="username" class="text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md">
          </select>
        </div>
        <div class="w-full flex flex-col relative h-1/6">
          <label class="mx-4">Email</label>
          <input type="text" id="email" class="text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md">
        </div>
        <div class="w-full flex flex-col relative h-1/6">
          <label class="mx-4">Password</label>
          <input type="password" id="password" class="text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md">
        </div>
        <div class="w-full h-1/4 flex flex-col relative h-1/6">
          <label class="mx-4">Password Confirmation</label>
          <input type="password" id="password_confirmation" class="text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md">
        </div>
        <div class="flex place-items-center justify-center pb-5">
          <input type="submit" value="Login" class="bg-blue-400 font-white w-36 h-10 rounded-md whitespace-normal">
        </div> 
      <div>
    <form>
    <span class="underline text-blue-700 cursor-pointer" id="go-to-login">Already have login credentials?</span>
  `

    const newSpan = document.createElement("span");
    newSpan.innerHTML = "&#88;"
    newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1"
    loginDiv.insertAdjacentElement("afterbegin", newSpan)
  
  newSpan.addEventListener("click", function() {
    removeLoginForm();
  })

  backgroundDiv.appendChild(loginDiv);
  document.querySelector("div#form-background-div").appendChild(loginDiv); 
  document.querySelector("div#landing-div").className += ' filter blur-md'
  document.querySelector("div#form-background-div").classList.remove("hidden")

  document.querySelector("form#new-user-form").addEventListener("submit", submitNewUserForm)
  document.querySelector("#go-to-login").addEventListener("click", launchLoginForm)
}

function createLoginDiv() {
  event.preventDefault();
  const loginDiv = document.createElement("div");
  loginDiv.className = "w-1/3 h-3/4 flex flex-col bg-gray-200 space-y-3 relative"
  return loginDiv
}

function submitLoginForm() {
  event.preventDefault();
  const formDiv = event.target
  const data = {
    user: {
      username: document.querySelector("input#username").value,
      password: document.querySelector("input#password").value
    }
  }

  fetch('http://localhost:3000/sessions/login', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(resp => resp.json())
  .then(function(json) {
    if (json.status === "error") {
      document.querySelector("span#login-error") ? document.querySelector("span#login-error").remove() : null 
      const div = document.querySelector("#login-div")
      const span = document.createElement("span")
      span.id = "login-error"
      span.innerText = json.message
      div.appendChild(span)
    } else {
      localStorage.setItem("token", json.jwt)
      onSuccessfulLogin(json);
    }
    

  })
  .catch((error) => {
    console.error('Error:', error);
    console.log(error)
  });
}

function submitNewUserForm() {
  event.preventDefault();
  const data = {
    user: {
      username: document.querySelector("input#username").value,
      email: document.querySelector("input#email").value,
      password: document.querySelector("input#password").value,
      password_confirmation: document.querySelector("input#password_confirmation").value
    }
  }

  fetch('http://localhost:3000/users', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(resp => resp.json())
  .then(function(json) {
    if (json.user) {
      localStorage.setItem("token", json.jwt)
      onSuccessfulLogin(json);
    } else {
      const keys = Object.keys(json)
      let userForm = document.querySelector("#new-user-form")

      userForm.querySelectorAll("input").forEach( input => {
        if (input.type === "text" || input.type === "password") {
          input.classList.replace("border-red-700", "border-black");
          input.parentElement.querySelector("span") ? input.parentElement.querySelector("span").remove() : null

          if (keys.includes(input.id)) {
            debugger;
            let message = json[`${input.id}`]

            input.classList.replace("border-black", "border-red-700")
            input.value = ""
            input.parentElement.innerHTML += `
              <span class="mx-4 absolute bottom-0 text-sm">${message}</span>
            `
          }
        }
      })
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    console.log(error)
  });
}

function onSuccessfulLogin(json) {
    removeLoginOrNewUserForm();
    showUserLoggedIn(json.user.data);
    document.querySelector("#highlight-buttons-div").classList.remove("hidden")
    showChooseMascotButton();
}

function showChooseMascotButton() {
  const chooseOrLogin = document.querySelector("#choose-opponent-or-login-div");
  const buttonClone = chooseOrLogin.firstElementChild.cloneNode(true)
  buttonClone.id = "choose-opponent"
  buttonClone.innerText = "Choose Opponent"

  chooseOrLogin.firstElementChild.replaceWith(buttonClone);

  document.querySelector("#choose-opponent").addEventListener("click", showOpponentInformation)
}

function removeLoginOrNewUserForm() {
  document.querySelector("#login-div") ? removeLoginForm() : removeNewUserForm();
}

function showHighlightSelectionOptions() {
  const highlightSelectionOptions = document.querySelector("div#highlight-selection-options")

  const newDiv = document.createElement("div")

  newDiv.id = "choose-highlight"
  newDiv.className = "flex space-x-1 w-full h-1/6 justify-around"
  newDiv.innerHTML = `
    <div>
      <label>Win Highlight<label>
      <select id="win-highlight" class="border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md"></select>
    </div>
    <div>
      <label>Loss Highlight</label>
      <select id="win-highlight" class="border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md"></select>
    </div>
  `

  highlightSelectionOptions.insertAdjacentElement("afterend", newDiv);
}

function removeLoginForm() {
  document.querySelector("#login-div").remove()
  document.querySelector("div#landing-div").classList.remove("filter", "blur-md");
  document.querySelector("div#form-background-div").classList.add("hidden")
}

function removeNewUserForm() {
  document.querySelector("#new-user-div").remove()
  document.querySelector("div#landing-div").classList.remove("filter", "blur-md");
  document.querySelector("div#form-background-div").classList.add("hidden")
}

function showUserLoggedIn(userObject) {
  const newDiv = document.createElement("div")
  newDiv.id = "current-user-info"
  newDiv.innerHTML = `
    <h1>Current User: ${userObject.attributes.username}</h1>
    <div class="self-center">
      <button class="self-center bg-blue-400 text-white w-24 h-8 border rounded-md" id="logout-button">logout</button>
    </div>
  `
  newDiv.className = "absolute h-16 right-0 top-0 mr-8 mt-4 flex-col flex"

  document.querySelector("div#landing-div").appendChild(newDiv)

  document.querySelector("button#logout-button").addEventListener("click", logout)
}

function logout() {
  localStorage.removeItem('token');
  location = window.location
}

function showHighlightOptions() {

}

