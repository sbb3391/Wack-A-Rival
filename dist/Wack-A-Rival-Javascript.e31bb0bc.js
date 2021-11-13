// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
// import Highlight from './highlight.js'
// import HighlightComment from './highlightcomment.js'
// import Mascot from './mascot.js'
// import Team from './team.js'
// import UserHighlight from './userHighlight.js'
var mascotImages = document.querySelector("template#mascot-images").content.children;
var previousMascotBottom, previousMascotLeft, previousMascotDiv;
var gameDetails = {
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
};
window.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#highlights-button").addEventListener("click", Highlight.displayHighlights);
  document.querySelector("#new-highlight-button").addEventListener("click", Highlight.addANewHighlight);
  Team.getAllTeams();
  determineIfLoggedIn();
});

function getRandomMascot() {
  randomMascot = mascotImages[Math.floor(Math.random() * mascotImages.length)].cloneNode(true);
  mascotDiv = document.createElement("div");
  mascotDiv.innerHTML = "\n    <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative z-10\">\n  ";
  assignMascotTopAndBottom();
  mascotDiv.className = "absolute";
  document.querySelector("#mascots-div").appendChild(mascotDiv);
  randomMascot.className = "mascot absolute bottom-10 z-0 left-10 transition duration-200";
  mascotDiv.appendChild(randomMascot);
}

function randomArrayIndex(elementsArray) {
  var max = elementsArray.length;
  return Math.floor(Math.random() * max);
}

function randomInteger(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomMascotDiv() {
  var previousMascotDivIndex = Array.from(document.querySelectorAll(".mascot-div")).indexOf(previousMascotDiv);
  previousMascotDivIndex = -1 ? previousMascotDivIndex = undefined : nil;
  var mascotDivElements = document.querySelectorAll(".mascot-div");
  var getRandomMascotDiv = mascotDivElements[randomArrayIndex(mascotDivElements)];

  while (getRandomMascotDiv === previousMascotDiv) {
    getRandomMascotDiv = mascotDivElements[randomArrayIndex(mascotDivElements)];
  }

  previousMascotDiv = getRandomMascotDiv;
  return getRandomMascotDiv;
}

function translateMascotUp(mascot, div) {
  if (allChildrenComplete(div)) {
    mascot.style.transform = "translateY(-105px)";
    var randomTime = randomInteger(500, 600);
    console.log("random time", randomTime);
    setTimeout(function () {
      div.remove();
      peepMascot();
    }, randomTime);
  } else {
    mascot.addEventListener("load", function () {
      mascot.style.transform = "translateY(-105px)";
      var randomTime = randomInteger(500, 600);
      console.log("random time", randomTime);
      setTimeout(function () {
        div.querySelector(".mascot-image").remove();
      }, randomTime);
    });
  }
}

function assignMascotTopAndBottom(mascotDiv) {
  // check if mascot bottom value is too close to the previous value. We don't want them popping up right next to each other
  var mascotBottom = randomInteger(0, 40);

  while (Math.abs(mascotBottom - previousMascotBottom) < 10) {
    mascotBottom = randomInteger(0, 40);
  }

  mascotDiv.style.bottom = mascotBottom + "%";
  previousMascotBottom = mascotBottom; // check the same way for mascot left value

  var mascotLeft = randomInteger(0, 75);

  while (Math.abs(mascotLeft - previousMascotLeft) < 20) {
    mascotLeft = randomInteger(0, 75);
  }

  mascotDiv.style.left = mascotLeft + "%";
  previousMascotLeft = mascotLeft;
  return mascotDiv;
}

function updateRivalsWacked() {
  gameDetails.scoreboard++;
  displayRivalsWacked();
}

function updateTotalRivals() {
  gameDetails.totalRivals++;
  displayTotalRivals();
}

function displayRivalsWacked() {
  var score = document.querySelector("span#rivals-wacked");
  score.innerText = gameDetails.scoreboard;
}

function displayTotalRivals() {
  var totalRivals = document.querySelector("span#total-rivals");
  totalRivals.innerText = gameDetails.totalRivals;
}

function countDownToStartGame(mascot) {
  gameDetails.gameMascot = mascot;
  gameDetails.gameTeam = Team.all.find(function (element) {
    return element.id == mascot.teamId;
  });
  var scoreboard = document.querySelector("div#scoreboard");
  var gameScreen = document.querySelector("div#game-screen");
  populateMascotsDiv();
  gameScreen.classList.remove("hidden");
  scoreboard.insertAdjacentElement("beforeEnd", createCountDownClockElement(5));
  var countDownClock = document.querySelector("div#countdown-clock");
  var numberDiv = countDownClock.querySelector("div#number-div");
  setTimeout(function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    var position = null;
    var checkIfScrollIsStatic = setInterval(function () {
      if (position === window.scrollY) {
        clearInterval(checkIfScrollIsStatic);
        document.querySelector("div#main-div").className += " hidden";
        document.querySelector("div#landing-div").className += " hidden";
        numberDiv.addEventListener("load", startCountDownClock(numberDiv));
      }

      position = window.scrollY;
    }, 50);
  }, 500);
}

function startGame() {
  var mascotsToBeWacked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
  inGameMascotCounter = 0;
  totalMascots = mascotsToBeWacked;
  gameDetails.gameMascot.peepMascot();
}

function startCountDownClock(numberDiv) {
  var countDownTimer = numberDiv.innerText;
  var countDownVar = setInterval(function () {
    countDownTimer--;
    numberDiv.style.transform = "translateX(35px)";
    numberDiv.addEventListener("transitionend", function () {
      numberDiv.innerText = countDownTimer;
      numberDiv.style.transform = "";
    });

    if (parseInt(countDownTimer) === 0) {
      clearInterval(countDownVar);
      document.querySelector("div#countdown-clock").remove();
      startGame(5);
    }
  }, 1000);
}

function createCountDownClockElement(initialValue) {
  var countDownClock = document.createElement("div");
  countDownClock.id = "countdown-clock";
  countDownClock.className = "inline-block w-full absolute bottom-1/4";
  countDownClock.innerHTML = "\n    <div class=\"w-6 overflow-hidden mx-auto\">\n      <div id=\"number-div\" class=\"transition duration-200\">".concat(initialValue, "</div>\n    </div>\n  ");
  return countDownClock;
}

function removeGameSettings() {
  var gameSettings = document.querySelector("div#game-settings");
  gameSettings ? gameSettings.remove() : null;
}

function removeTeamDetails() {
  var teamDetail = document.querySelector("#team-detail");
  teamDetail.firstElementChild ? teamDetail.firstElementChild.remove() : null;
}

function createMascotCopy(mascot) {
  var copySrc = mascot.src;
  var copyWidth = "90px";
  var copy = document.createElement("img");
  copy.style.width = copyWidth;
  copy.src = copySrc;
  return copy;
}

function hideGameScreen() {
  document.querySelector("div#game-screen").classList.add("hidden");
}

function allChildrenComplete(div) {
  Array.from(div.children).every(function (element) {
    return element.complete;
  });
}

function displayResultsAndMedia() {
  var gameScreen = document.querySelector("div#game-screen");

  var winOrLossHighlight = function winOrLossHighlight() {
    if (gameDetails.winner === "Arkansas") {
      var teamLossHighlights = gameDetails.lossHighlights;
      return teamLossHighlights[randomArrayIndex(teamLossHighlights)];
    } else {
      var teamWinHighlights = gameDetails.winHighlights;
      return teamWinHighlights[randomArrayIndex(teamWinHighlights)];
    }
  };

  var highlight = winOrLossHighlight();
  highlight["userId"] = document.querySelector("#current-user-info").dataset.currentUser;
  UserHighlight.createNewUserHighlight(highlight);

  while (gameScreen.lastElementChild) {
    gameScreen.lastElementChild.remove();
  }

  var winner = document.createElement("div");
  winner.className = "w-full h-full flex items-center justify-center";
  winner.innerHTML = "\n      <div class=\"w-3/4 h-4/5 flex flex-col space-y-10 text-center justify-center place-items-center\">\n        <div class=\"text-lg w-1/2\">".concat(highlight.description, "</div>\n        <div>").concat(highlight.mediaUrl, "</div>\n      </div>\n    ");
  gameScreen.insertAdjacentElement("beforeEnd", winner);
}

function populateMascotsDiv() {
  var mascotsDiv = document.querySelector("div#mascots-div");
  mascotsDiv.innerHTML = "\n    <div class=\"flex w-full h-1/2 justify-around relative\">\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-16 z-10 \">\n      </div>\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-16 z-10\">\n      </div>\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-16 z-10\">\n      </div>\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-16 z-10\">\n      </div>\n    </div>\n    <div class=\"flex w-full h-1/2 relative justify-around\">\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-14 z-10\">\n      </div>\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-14 z-10\">\n      </div>\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-14 z-10\">\n      </div>\n      <div class=\"mascot-div relative bottom-0 select-none\">\n        <img src=\"wack-a-mole-images/dirt-pile.png\" width=\"175\" class=\"relative top-14 z-10\">\n      </div>\n    </div>\n  ";
}

function resetGameScreen() {
  var gameScreen = document.querySelector("div#game-screen");
  gameScreen.innerHTML = "\n    <div id=\"scoreboard\" class=\"h-1/6 relative\">\n      <h1 class=\"text-center pt-7\">Rivals Wacked: <span id=\"rivals-wacked\">0</span><span>/</span><span id=\"total-rivals\">0</span> </h1>\n    </div>\n    <div id=\"mascots-div\" class=\"mx-auto w-10/12 z-10 h-4/5 border-2 border-black rounded-md flex flex-col\">\n    </div>\n  ";
  gameDetails.scoreboard = 0;
  gameDetails.totalRivals = 0;
}

function displayWinner() {
  var gameScreen = document.querySelector("div#game-screen");
  var winner = document.createElement("div");
  winner.className = "w-full h-full flex items-center justify-center";
  winner.innerHTML = "\n    <div class=\"w-3/4 h-4/5 text-center\">\n      <p class=\"text-2xl\">".concat(gameDetails.winner, " Wins</p>\n      <img class=\"mx-auto\" src=\"./gifs/Cringe2.gif\" width=800px>\n    </div>\n  ");
  gameScreen.insertAdjacentElement("beforeEnd", winner);
}

function showHighlightDetails() {
  var highlightId = event.target.dataset.highlightId;
  fetch("http://localhost:3000/highlights/".concat(highlightId)).then(function (resp) {
    return resp.json();
  }).then(function (json) {
    return displayHighlightDetails(json);
  });
}

function displayHighlightDetails(json) {
  var highlight = Highlight.createHighlight(json.data);
  var highlightTeamsDiv = document.querySelector("div#highlight-teams");
  var highlightDiv = document.createElement("div");
  highlightDiv.className = "w-full h-full bg-gray-200 flex z-10 absolute justify-around";
  highlightDiv.id = "highlight-div";
  highlightDiv.innerHTML = "\n    <div class=\"w-1/4 h-full flex flex-col space-y-1\">\n      <div>DATE</div>\n      <div class=\"w-full flex space-x-4\">\n        <label class=\"w-24\">Description:</label>\n        <textarea class=\"resize-none border-none bg-gray-200 w-5/6 focus:outline-none\" disabled=\"true\" rows=\"9\">".concat(highlight.description, "</textarea>\n      </div>\n      <div class=\"w-full flex space-x-4\">\n        <label class=\"w-24\">Media URL:</label>\n        <textarea class=\"resize-none border-none bg-gray-200 w-5/6 focus:outline-none\" disabled=\"true\" rows=\"9\">").concat(highlight.mediaUrl, "</textarea>\n      </div>\n      <div class=\"w-full flex space-x-4\">\n        <label class=\"w-24\">Win/Loss:</label>\n        <input class=\"border-none bg-gray-200 w-5/6 focus:outline-none\" disabled=\"true\" value='").concat(highlight.highlightType, "'>\n      </div>\n    </div>\n    <div class=\"w-1/3 flex justify-center place-items-center relative\">\n      <div id=\"highlight-iframe\">").concat(highlight.mediaUrl, "</div>\n    </div>\n    <div class=\"w-1/4 flex flex-col\">\n      <div class=\"h-1/3 w-full border-b-4 border-black rounded-sm\">\n        <form id=\"new-comment-form\" data-highlight-id=\"").concat(highlight.id, "\">\n          <div class=\"w-full flex flex-col mt-4 space-y-2\">\n            <div class=\"w-full h-1/4\">\n              <textarea class=\"block mx-auto resize-none border-black border-2 bg-gray-200 w-11/12 px-1 rounded-md placeholder-gray-500 placeholder-opacity-100\" placeholder=\"leave your comment...\" rows=\"5\"></textarea>\n            </div>\n            <div class=\"text-center\">\n              <input type=\"submit\" value=\"Add Comment\" class=\"bg-blue-400 font-white text-sm w-36 h-6 rounded-md whitespace-normal\">\n            </div>\n          </div>\n        <form>\n      </div>\n      <div id=\"comments-div\" class=\"w-full flex flex-col overflow-auto pl-3\">\n      </div>\n    </div>\n    <span class=\"absolute right-0 top-0 cursor-pointer pr-3\">&#88;</span>\n  ");
  highlightDiv.style.marginLeft = "0px";
  highlightTeamsDiv.parentElement.appendChild(highlightDiv);
  var iframe = document.querySelector("div#highlight-iframe").firstElementChild;
  iframe.width = "550";
  iframe.height = "350"; // listener for X button to close out highlight window

  iframe.parentElement.parentElement.parentElement.querySelector("span").addEventListener("click", function () {
    document.querySelector("div#highlight-div").remove();
    HighlightComment.all = [];
  }); // adding comments

  HighlightComment.getAllCommentsSortedNewestToOldest(json.included);
  HighlightComment.all.forEach(function (comment) {
    return HighlightComment.appendNewComment("afterbegin", comment);
  }); // listener for new comment

  document.querySelector("form#new-comment-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var highlightId = event.target.dataset.highlightId;
    var userId = document.querySelector("div#current-user-info").dataset.currentUser;
    var commentText = event.target.querySelector("textarea").value;
    HighlightComment.createNewComment(highlightId, userId, commentText);
  });
}

function createHighlightsDiv() {
  var highlightsDiv = document.createElement("div");
  highlightsDiv.className = "w-5/12 h-5/6 flex flex-col bg-gray-200 space-y-3 relative overflow-auto";
  return highlightsDiv;
}

function determineGameWinner() {
  if (gameDetails.scoreboard >= gameDetails.totalRivals / 2) {
    gameDetails.winner = "Arkansas";
  } else {
    gameDetails.winner = Team.all.find(function (team) {
      return team.id == gameDetails.gameMascot.teamId;
    }).shorthandName;
  }
}

function displayGameSettings() {
  var newDiv = document.createElement("div");
  newDiv.className = "flex flex-col space-y-2 w-5/6 h-1/3 mx-auto justify-around border-black border-2 rounded-md";
  newDiv.id = "game-settings";
  newDiv.innerHTML = "\n    <h1 class=\"text-center italic\">Difficulty Level:</h1>\n    <div id=\"radio-div\" class=\"flex justify-around place-items-center mb-2\">\n      <div>\n        <input type=\"radio\" name=\"difficulty-level\" data-difficulty=\"1\" checked><label>Walk On</label>\n      </div>\n      <div>\n        <input type=\"radio\" name=\"difficulty-level\" data-difficulty=\"2\"><label>Starter</label>\n      </div>\n    </div>\n    <div class=\"flex justify-around place-items-center space-y-1\">\n      <div>\n        <input type=\"radio\" name=\"difficulty-level\" data-difficulty=\"3\"><label>All Conference</label>\n      </div>\n      <div>\n        <input type=\"radio\" name=\"difficulty-level\" data-difficulty=\"4\"><label>All American</label>\n      </div>\n    </div>\n    <div class=\"flex space-x-1 w-full justify-around\" id=\"highlight-selection-options\">\n      <div class=\"flex flex-col justify-center w-5/12\">\n        <label class=\"text-center italic\">Win Highlight<label>\n        <select id=\"win-highlight\" class=\"border-black border-2 rounded-md bg-gray-200 w-full text-md\">\n          <option value=\"random\" selected>Random</option>\n        </select>\n      </div>\n      <div class=\"flex flex-col justify-center w-5/12\">\n        <label class=\"text-center italic\">Loss Highlight</label>\n        <select id=\"loss-highlight\" class=\"border-black border-2 rounded-md bg-gray-200 w-full text-md\">\n          <option value=\"random\" selected>Random</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"self-center\">\n      <button class=\"self-center bg-blue-400 text-white w-48 h-8 border rounded-md\" id=\"go-button\">Go</button>\n    </div>\n  ";
  document.querySelector("#mascot-selection").insertAdjacentElement("afterend", newDiv);
  var goBtn = document.querySelector("#go-button");
  var mascot = Mascot.all.find(function (mascot) {
    return mascot.name == document.querySelector("#mascot-description").innerText;
  }); // const chooseRadio = document.querySelector("#game-settings").querySelector("input[value='choose']")
  // chooseRadio.addEventListener("click", showHighlightSelectionOptions)

  goBtn.addEventListener("click", function () {
    var selectedDifficulty = document.querySelector("#game-settings").querySelector("input:checked").dataset.difficulty;
    updateGameDetailDifficultySettings(selectedDifficulty);
    countDownToStartGame(mascot);
    setTimeout(function () {
      newDiv.remove();
    }, 1000);
  });
}

function updateGameDetailDifficultySettings(difficulty) {
  switch (difficulty) {
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
  var mainDiv = document.querySelector("#main-div");
  mainDiv.classList.remove("hidden");
  window.scrollTo({
    top: mainDiv.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });
}

function determineIfLoggedIn() {
  var token = localStorage.token;

  if (token) {
    fetch("http://localhost:3000/sessions/autologin", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(token)
      }
    }).then(function (resp) {
      return resp.json();
    }).then(function (json) {
      debugger;
      showUserLoggedIn(json.data);
      document.querySelector("#highlight-buttons-div").classList.remove("hidden");
      showChooseMascotButton();
    });
  } else {
    forceUserLogin();
  }
}

function forceUserLogin() {
  var chooseOpponentParent = document.querySelector("#choose-opponent").parentElement;
  var loginButton = chooseOpponentParent.firstElementChild.cloneNode(true);
  loginButton.innerText = "Login";
  chooseOpponentParent.firstElementChild.replaceWith(loginButton);
  loginButton.addEventListener("click", launchLoginForm);
}

function launchLoginForm() {
  document.querySelector("#new-user-div") ? removeNewUserForm() : null;
  var backgroundDiv = document.createElement("div");
  var loginDiv = createLoginDiv();
  backgroundDiv.id = "background-div";
  backgroundDiv.className = "w-5/6 h-auto bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative";
  loginDiv.id = "login-div";
  loginDiv.innerHTML = "\n    <h1 class=\"w-3/4 text-center\">Login Form</h1>\n    <form id=\"login-form\">\n      <div class=\"flex flex-col space-y-7\">\n        <div class=\"w-full flex flex-col \">\n          <label class=\"mx-4\">Username</label>\n          <input type=\"text\" id=\"username\" class=\"text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md\">\n          </select>\n        </div>\n        <div class=\"w-full flex flex-col\">\n          <label class=\"mx-4\">Password</label>\n          <input type=\"password\" id=\"password\" class=\"text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md\">\n        </div>\n        <div class=\"flex place-items-center justify-center pb-5\">\n          <input type=\"submit\" value=\"Login\" class=\"bg-blue-400 font-white w-36 h-10 rounded-md whitespace-normal\">\n        </div> \n      <div>\n    <span class=\"underline text-blue-700 cursor-pointer\" id=\"go-to-new-user\">Don't have an account?</span>\n    \n  ";
  var newSpan = document.createElement("span");
  newSpan.innerHTML = "&#88;";
  newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1";
  loginDiv.insertAdjacentElement("afterbegin", newSpan);
  newSpan.addEventListener("click", function () {
    removeLoginForm();
  });
  backgroundDiv.appendChild(loginDiv);
  document.querySelector("div#form-background-div").appendChild(loginDiv);
  document.querySelector("div#landing-div").className += ' filter blur-md';
  document.querySelector("div#form-background-div").classList.remove("hidden");
  document.querySelector("form#login-form").addEventListener("submit", submitLoginForm);
  document.querySelector("#go-to-new-user").addEventListener("click", launchNewUserForm);
}

function launchNewUserForm() {
  removeLoginForm();
  var backgroundDiv = document.createElement("div");
  var loginDiv = createLoginDiv();
  backgroundDiv.id = "background-div";
  backgroundDiv.className = "w-5/6 h-auto bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative";
  loginDiv.id = "new-user-div";
  loginDiv.innerHTML = "\n    <h1 class=\"w-3/4 text-center\">New User Form</h1>\n    <form id=\"new-user-form\" class=\"h-full\">\n      <div class=\"flex flex-col h-full space-y-2\">\n        <div class=\"w-full flex flex-col relative h-1/6\">\n          <label class=\"mx-4\">Username</label>\n          <input type=\"text\" id=\"username\" class=\"text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md\">\n          </select>\n        </div>\n        <div class=\"w-full flex flex-col relative h-1/6\">\n          <label class=\"mx-4\">Email</label>\n          <input type=\"text\" id=\"email\" class=\"text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md\">\n        </div>\n        <div class=\"w-full flex flex-col relative h-1/6\">\n          <label class=\"mx-4\">Password</label>\n          <input type=\"password\" id=\"password\" class=\"text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md\">\n        </div>\n        <div class=\"w-full h-1/4 flex flex-col relative h-1/6\">\n          <label class=\"mx-4\">Password Confirmation</label>\n          <input type=\"password\" id=\"password_confirmation\" class=\"text-2xl border-black border-2 mx-4 h-10 rounded-md bg-gray-200 w-11/12 text-md\">\n        </div>\n        <div class=\"flex place-items-center justify-center pb-5\">\n          <input type=\"submit\" value=\"Login\" class=\"bg-blue-400 font-white w-36 h-10 rounded-md whitespace-normal\">\n        </div> \n      <div>\n    <form>\n    <span class=\"underline text-blue-700 cursor-pointer\" id=\"go-to-login\">Already have login credentials?</span>\n  ";
  var newSpan = document.createElement("span");
  newSpan.innerHTML = "&#88;";
  newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1";
  loginDiv.insertAdjacentElement("afterbegin", newSpan);
  newSpan.addEventListener("click", function () {
    removeLoginForm();
  });
  backgroundDiv.appendChild(loginDiv);
  document.querySelector("div#form-background-div").appendChild(loginDiv);
  document.querySelector("div#landing-div").className += ' filter blur-md';
  document.querySelector("div#form-background-div").classList.remove("hidden");
  document.querySelector("form#new-user-form").addEventListener("submit", submitNewUserForm);
  document.querySelector("#go-to-login").addEventListener("click", launchLoginForm);
}

function createLoginDiv() {
  event.preventDefault();
  var loginDiv = document.createElement("div");
  loginDiv.className = "w-1/3 h-3/4 flex flex-col bg-gray-200 space-y-3 relative";
  return loginDiv;
}

function submitLoginForm() {
  event.preventDefault();
  var formDiv = event.target;
  var data = {
    user: {
      username: document.querySelector("input#username").value,
      password: document.querySelector("input#password").value
    }
  };
  fetch('http://localhost:3000/sessions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (resp) {
    return resp.json();
  }).then(function (json) {
    if (json.status === "error") {
      document.querySelector("span#login-error") ? document.querySelector("span#login-error").remove() : null;
      var div = document.querySelector("#login-div");
      var span = document.createElement("span");
      span.id = "login-error";
      span.innerText = json.message;
      div.appendChild(span);
    } else {
      localStorage.setItem("token", json.jwt);
      onSuccessfulLogin(json);
    }
  }).catch(function (error) {
    console.error('Error:', error);
    console.log(error);
  });
}

function submitNewUserForm() {
  event.preventDefault();
  var data = {
    user: {
      username: document.querySelector("input#username").value,
      email: document.querySelector("input#email").value,
      password: document.querySelector("input#password").value,
      password_confirmation: document.querySelector("input#password_confirmation").value
    }
  };
  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (resp) {
    return resp.json();
  }).then(function (json) {
    if (json.user) {
      localStorage.setItem("token", json.jwt);
      onSuccessfulLogin(json);
    } else {
      var keys = Object.keys(json);
      var userForm = document.querySelector("#new-user-form");
      userForm.querySelectorAll("input").forEach(function (input) {
        if (input.type === "text" || input.type === "password") {
          input.classList.replace("border-red-700", "border-black");
          input.parentElement.querySelector("span") ? input.parentElement.querySelector("span").remove() : null;

          if (keys.includes(input.id)) {
            var message = json["".concat(input.id)];
            input.classList.replace("border-black", "border-red-700");
            input.value = "";
            input.parentElement.innerHTML += "\n              <span class=\"mx-4 absolute bottom-0 text-sm\">".concat(message, "</span>\n            ");
          }
        }
      });
    }
  }).catch(function (error) {
    console.error('Error:', error);
    console.log(error);
  });
}

function onSuccessfulLogin(json) {
  removeLoginOrNewUserForm();
  showUserLoggedIn(json.user.data);
  document.querySelector("#highlight-buttons-div").classList.remove("hidden");
  showChooseMascotButton();
}

function showChooseMascotButton() {
  var chooseOrLogin = document.querySelector("#choose-opponent-or-login-div");
  var buttonClone = chooseOrLogin.firstElementChild.cloneNode(true);
  buttonClone.id = "choose-opponent";
  buttonClone.innerText = "Choose Opponent";
  chooseOrLogin.firstElementChild.replaceWith(buttonClone);
  document.querySelector("#choose-opponent").addEventListener("click", showOpponentInformation);
}

function removeLoginOrNewUserForm() {
  document.querySelector("#login-div") ? removeLoginForm() : removeNewUserForm();
}

function showHighlightSelectionOptions() {
  var highlightSelectionOptions = document.querySelector("div#highlight-selection-options");
  var newDiv = document.createElement("div");
  newDiv.id = "choose-highlight";
  newDiv.className = "flex space-x-1 w-full h-1/6 justify-around";
  newDiv.innerHTML = "\n    <div>\n      <label>Win Highlight<label>\n      <select id=\"win-highlight\" class=\"border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md\"></select>\n    </div>\n    <div>\n      <label>Loss Highlight</label>\n      <select id=\"win-highlight\" class=\"border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md\"></select>\n    </div>\n  ";
  highlightSelectionOptions.insertAdjacentElement("afterend", newDiv);
}

function removeLoginForm() {
  document.querySelector("#login-div").remove();
  document.querySelector("div#landing-div").classList.remove("filter", "blur-md");
  document.querySelector("div#form-background-div").classList.add("hidden");
}

function removeNewUserForm() {
  document.querySelector("#new-user-div").remove();
  document.querySelector("div#landing-div").classList.remove("filter", "blur-md");
  document.querySelector("div#form-background-div").classList.add("hidden");
}

function showUserLoggedIn(userObject) {
  debugger;
  var newDiv = document.createElement("div");
  newDiv.id = "current-user-info";
  newDiv.dataset.currentUser = userObject.id;
  newDiv.innerHTML = "\n    <h1>Current User: ".concat(userObject.attributes.username, "</h1>\n    <div class=\"self-center\">\n      <button class=\"self-center bg-blue-400 text-white w-24 h-8 border rounded-md\" id=\"logout-button\">logout</button>\n    </div>\n  ");
  newDiv.className = "absolute h-16 right-0 top-0 mr-8 mt-4 flex-col flex";
  document.querySelector("div#landing-div").appendChild(newDiv);
  document.querySelector("button#logout-button").addEventListener("click", logout);
}

function logout() {
  localStorage.removeItem('token');
  location = window.location;
}

function showHighlightOptions() {}
},{}],"../../../../../../../home/sbb3391/.nvm/versions/node/v15.1.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33963" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../home/sbb3391/.nvm/versions/node/v15.1.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Wack-A-Rival-Javascript.e31bb0bc.js.map