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
})({"mascot.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Mascot = /*#__PURE__*/function () {
  function Mascot(mascot) {
    _classCallCheck(this, Mascot);

    this.id = mascot["id"], this.name = mascot["name"];
    this.originDescription = mascot["origin_description"], this.cartoonImageLocation = mascot["cartoon_image_location"], this.realLifeImage_location = mascot["real_life_image_location"], this.teamId = mascot["team_id"];
  }

  _createClass(Mascot, [{
    key: "showNextMascot",
    value: function showNextMascot() {
      var _this = this;

      var a = event.target;
      var aClone = a.cloneNode(true);
      a.parentElement.replaceChild(aClone, a);
      removeGameSettings();
      hideGameScreen();

      if (Mascot.all.indexOf(this) == Mascot.all.length - 1) {
        var newMascot = Mascot.all[0];
        var thisTeam = Team.all.find(function (team) {
          return team.id == newMascot.teamId;
        });
        var newMascotImg = newMascot.createMascotElement(); // remove current mascot image

        document.querySelector("img.mascot-image").remove(); // add next mascot image to carosel

        document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg);
        newMascot.transitionMascotListener();
        document.querySelector("div#image-counter").innerText = "".concat(Mascot.all.indexOf(newMascot) + 1, "/").concat(Mascot.all.length);
        document.querySelector("div#mascot-description").innerText = "".concat(Mascot.all[Mascot.all.indexOf(newMascot)].name);
        var next = document.querySelector("a#next");
        thisTeam.showTeamAndMascotDetails();
        next.addEventListener("click", function () {
          Mascot.all[0].showNextMascot();
        }); // const firstMascotImage = Mascot.all[0].createMascotElement();
        // document.querySelector("img.mascot-image").remove();
        // document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", firstMascotImage)
        // Mascot.all[0].transitionMascotListener() 
        // document.querySelector("div#image-counter").innerText = `1/${Mascot.all.length}`
        // document.querySelector("div#mascot-description").innerText = `${Mascot.all[0].name}`
        // const next = document.querySelector("a#next")
      } else {
        var _newMascot = Mascot.all[Mascot.all.indexOf(this) + 1];

        var _thisTeam = Team.all.find(function (team) {
          return team.id == _newMascot.teamId;
        });

        var _newMascotImg = _newMascot.createMascotElement(); // remove current mascot image


        document.querySelector("img.mascot-image").remove(); // add next mascot image to carosel

        document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", _newMascotImg);

        _newMascot.transitionMascotListener();

        document.querySelector("div#image-counter").innerText = "".concat(Mascot.all.indexOf(_newMascot) + 1, "/").concat(Mascot.all.length);
        document.querySelector("div#mascot-description").innerText = "".concat(Mascot.all[Mascot.all.indexOf(_newMascot)].name);

        var _next = document.querySelector("a#next");

        _thisTeam.showTeamAndMascotDetails();

        _next.addEventListener("click", function () {
          Mascot.all[parseInt(Mascot.all.indexOf(_this) + 1)].showNextMascot();
        });
      }
    }
  }, {
    key: "showPreviousMascot",
    value: function showPreviousMascot() {
      var _this2 = this;

      var a = event.target;
      var aClone = a.cloneNode(true);
      a.parentElement.replaceChild(aClone, a);
      removeGameSettings();
      hideGameScreen();
      var thisTeam = Team.all.find(function (team) {
        return team.id == _this2.teamId;
      });

      if (Team.all.indexOf(thisTeam) === 0) {
        var newMascot = Mascot.all[Mascot.all.length - 1];
        var newMascotImg = newMascot.createMascotElement(); // remove current mascot image

        document.querySelector("img.mascot-image").remove(); // add next mascot image to carosel

        document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", newMascotImg);
        newMascot.transitionMascotListener();
        document.querySelector("div#image-counter").innerText = "".concat(Mascot.all.indexOf(newMascot) + 1, "/").concat(Mascot.all.length);
        document.querySelector("div#mascot-description").innerText = "".concat(Mascot.all[Mascot.all.indexOf(newMascot)].name);
        var previous = document.querySelector("a#previous");
        var teamForThisMascot = Team.all.find(function (team) {
          return team.id == newMascot.teamId;
        });
        teamForThisMascot.showTeamAndMascotDetails();
        previous.addEventListener("click", function () {
          return Mascot.all[Mascot.all.length - 1].showPreviousMascot();
        });
      } else {
        var _newMascot2 = Mascot.all[Mascot.all.indexOf(this) - 1];

        var _newMascotImg2 = _newMascot2.createMascotElement(); // remove current mascot image


        document.querySelector("img.mascot-image").remove(); // add next mascot image to carosel

        document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", _newMascotImg2);

        _newMascot2.transitionMascotListener();

        document.querySelector("div#image-counter").innerText = "".concat(Mascot.all.indexOf(_newMascot2) + 1, "/").concat(Mascot.all.length);
        document.querySelector("div#mascot-description").innerText = "".concat(Mascot.all[Mascot.all.indexOf(_newMascot2)].name);

        var _previous = document.querySelector("a#previous");

        var _teamForThisMascot = Team.all.find(function (team) {
          return team.id == _newMascot2.teamId;
        });

        _teamForThisMascot.showTeamAndMascotDetails();

        _previous.addEventListener("click", function () {
          _newMascot2.showPreviousMascot();
        });
      }
    }
  }, {
    key: "createMascotElement",
    value: function createMascotElement() {
      var image = document.createElement("img");
      image.src = this.cartoonImageLocation;
      image.setAttribute("width", "120px");
      image.setAttribute("data-mascot-id", this.id);
      image.className = "mascot-image text-center";
      return image;
    }
  }, {
    key: "transitionMascotListener",
    value: function transitionMascotListener() {
      var _this3 = this;

      var mascotDiv = document.querySelector("div#current-mascot");
      var teamOfThisMascot = Team.all.find(function (element) {
        return element.id == _this3.teamId;
      });
      mascotDiv.children[0].addEventListener("mouseenter", function (e) {
        mascotDiv.style.transform = "translateY(-20px)";
      });
      mascotDiv.children[0].addEventListener("mouseleave", function (e) {
        mascotDiv.style.transform = "";
      });
    }
  }, {
    key: "peepMascot",
    value: function peepMascot() {
      if (gameDetails.totalRivals < gameDetails.mascotsToBeWacked) {
        var mascotDivs = document.querySelectorAll(".mascot-div");
        var randomMascotDiv = getRandomMascotDiv();
        var mascotImage = gameDetails.gameMascot.createMascotElement();
        mascotImage.className += " absolute bottom-0 transition duration-200 left-10";
        mascotImage.setAttribute("width", "110px");
        randomMascotDiv.appendChild(mascotImage);
        mascotImage.addEventListener("load", function () {
          updateTotalRivals();
          mascotImage.addEventListener("click", function () {
            updateRivalsWacked();
          });

          if (allChildrenComplete(randomMascotDiv)) {
            mascotImage.style.transform = "translateY(-105px)";
            var randomTime = randomInteger(gameDetails.randomTimeMin, gameDetails.randomTimeMax);
            setTimeout(function () {
              mascotImage.remove();
              gameDetails.gameMascot.peepMascot();
            }, randomTime);
          } else {
            mascotImage.style.transform = "translateY(-105px)";

            var _randomTime = randomInteger(gameDetails.randomTimeMin, gameDetails.randomTimeMax);

            setTimeout(function () {
              mascotImage.remove();
              gameDetails.gameMascot.peepMascot();
              inGameMascotCounter++;
            }, _randomTime);
          }
        });
      } else {
        determineGameWinner();
        setTimeout(function () {
          var gameScreen = document.querySelector("div#game-screen");

          while (gameScreen.lastElementChild) {
            gameScreen.lastElementChild.remove();
          }

          displayWinner();
          Highlight.getHighlightMedia();
          setTimeout(function () {
            displayResultsAndMedia();
            setTimeout(function () {
              // clear highlights from game details
              gameDetails.winHighlights = [];
              gameDetails.lossHighglights = [];
              document.querySelector("div#main-div").classList.remove("hidden");
              document.querySelector("div#landing-div").classList.remove("hidden");
              window.scrollTo(0, document.body.scrollHeight);
              setTimeout(function () {
                window.scrollTo({
                  top: document.querySelector("div#main-div").scrollHeight,
                  left: 0,
                  behavior: 'smooth'
                });
                var position = null;
                var checkIfScrollIsStatic = setInterval(function () {
                  if (position === window.scrollY) {
                    clearInterval(checkIfScrollIsStatic);
                    gameScreen.className += " hidden";
                    resetGameScreen();
                  }

                  position = window.scrollY;
                }, 50);
              }, 500);
            }, 8000);
          }, 8000);
        }, 4500);
      }
    }
  }], [{
    key: "addMascot",
    value: function addMascot(mascotData) {
      var mascot = {};
      mascot["id"] = mascotData.id, mascot["name"] = mascotData.attributes.name, mascot["origin_description"] = mascotData.attributes.origin_description, mascot["cartoon_image_location"] = mascotData.attributes.cartoon_image_location, mascot["real_life_image_location"] = mascotData.attributes.real_life_image_location, mascot["team_id"] = mascotData.attributes.team_id;
      var newMascot = new Mascot(mascot);
      Mascot.all.push(newMascot);
      Team.all.find(function (element) {
        return element.id == newMascot["teamId"];
      }).mascot = newMascot;
    }
  }, {
    key: "displayMascotCarosel",
    value: function displayMascotCarosel() {
      var currentMascot = Mascot.all[0];
      var currentMascotTeam = Team.all.find(function (team) {
        return team.id == currentMascot.teamId;
      });
      var MascotSelectionDiv = document.querySelector("div#mascot-selection");
      MascotSelectionDiv.innerHTML = "\n    <div id=\"image-counter\" class=\"absolute top-0 left-0\"></div>\n    <div id=\"current-mascot\" class=\"relative transition duration-500 flex w-full items-center justify-center text-center\">\n    \n    </div>\n    <a id=\"previous\" class=\"cursor-pointer absolute top-1/2 p-4 w-auto left-0 text-2xl select-none\">&#10094;</a>\n    <a id=\"next\" class=\"cursor-pointer absolute top-1/2 p-4 w-auto right-0 text-2xl select-none\">&#10095;</a>\n    <div class=\"self-center\">\n      <button id=\"wack-a-button\" class=\"bg-blue-400 text-white w-48 h-8 border rounded-md\">Wack-a-".concat(currentMascotTeam.wackA, "</button>\n    </div>\n    ");
      var currentMascotImage = currentMascot.createMascotElement();
      var schoolNameDiv = document.createElement("div");
      schoolNameDiv.id = "mascot-description";
      schoolNameDiv.innerText = "".concat(currentMascot.name);
      schoolNameDiv.className = "font-bold";
      MascotSelectionDiv.insertAdjacentElement("afterbegin", schoolNameDiv);
      document.querySelector("div#current-mascot").insertAdjacentElement("beforeend", currentMascotImage);
      currentMascot.transitionMascotListener();
      document.querySelector("div#image-counter").innerText = "".concat(Mascot.all.indexOf(currentMascot) + 1, "/").concat(Mascot.all.length);
      var thisTeam = Team.all.find(function (team) {
        return team.id == currentMascot.teamId;
      });
      thisTeam.showTeamAndMascotDetails();
      document.querySelector("#wack-a-button").addEventListener("click", function () {
        event.preventDefault();
        displayGameSettings();
      });

      function previousMascot() {
        currentMascot.showPreviousMascot();
      }

      currentMascotImage.addEventListener("load", function () {
        var next = document.querySelector("a#next");
        var previous = document.querySelector("a#previous");
        next.addEventListener("click", function () {
          currentMascot.showNextMascot();
        });
        previous.addEventListener("click", function () {
          currentMascot.showPreviousMascot();
        });
      });
    }
  }]);

  return Mascot;
}();

_defineProperty(Mascot, "all", []);
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
},{}]},{},["../../../../../../../home/sbb3391/.nvm/versions/node/v15.1.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","mascot.js"], null)
//# sourceMappingURL=/mascot.dd7fb354.js.map