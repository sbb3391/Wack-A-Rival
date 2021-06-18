const mascotImages = document.querySelector("template#mascot-images").content.children;
let previousMascotBottom, previousMascotLeft
let scoreboard = 0;

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

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function translateMascotUp(mascot, div) {
  mascot.style.transform = "translateY(-105px)";

  mascot.addEventListener("transitionend", function() {
    let randomTime = randomInteger(500, 600)
    console.log("random time", randomTime)

    setTimeout(function() {
      div.remove();
      const newMascot = createMascotCopy(mascot);
      peep(newMascot)
    }, randomTime)
  })
}

function assignMascotTopAndBottom() {
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
}

function peep(mascot) {
  mascotDiv = document.createElement("div")
  mascotDiv.innerHTML = `
    <img src="wack-a-mole-images/dirt-pile.png" width="175" class="relative z-10">
  `

  assignMascotTopAndBottom();

  mascotDiv.className = `absolute`

  document.querySelector("#mascots-div").appendChild(mascotDiv)
  mascot.className = "mascot absolute bottom-10 z-0 left-10 transition duration-200"
  mascotDiv.appendChild(mascot)
  
  mascot.addEventListener("load", () => {
    mascot.addEventListener("click", function() {
      updateScoreboard();
    })
    translateMascotUp(mascot, mascotDiv);
  })
   
}

function updateScoreboard() {
  scoreboard += 1
  displayScore();
}

function displayScore() {
  let score = document.querySelector("div#scoreboard").querySelector("span");
  score.innerText = scoreboard;
}

function countDownToStartGame() {
  const scoreboard = document.querySelector("div#scoreboard");
  const gameScreen = document.querySelector("div#game-screen");
  gameScreen.classList.remove("hidden")

  scoreboard.insertAdjacentElement("beforeEnd", createCountDownClockElement(5));
  const countDownClock = document.querySelector("div#countdown-clock")
  const numberDiv = countDownClock.querySelector("div#number-div")

  window.scrollTo({
    top: gameScreen.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });

  numberDiv.addEventListener("load", startCountDownClock(numberDiv))
}

function startGame(gameLength) {
  document.querySelector("div#scoreboard").insertAdjacentElement("beforeEnd", createCountDownClockElement(gameLength));

  const gameClock = document.querySelector("div#countdown-clock")
  const numberDiv = gameClock.querySelector("div#number-div");
  startGameClock(numberDiv, gameLength);
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
      startGame(10);
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

function startGameClock(numberDiv, gameLength) {

  const MascotToCopy = document.querySelector("img.mascot-image")

  peep(createMascotCopy(MascotToCopy));

  let gameClock = numberDiv.innerText

  const gameClockVar = setInterval(() => {
  
    gameClock -- 

    numberDiv.style.transform = "translateX(35px)"

    numberDiv.addEventListener("transitionend", function() {
      numberDiv.innerText = gameClock
      numberDiv.style.transform = ""
    })

    if (gameClock == 0) {
      document.querySelector("div#countdown-clock").remove()
      clearInterval(gameClockVar);
    } 
  }, 1000)
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





