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
})({"highlight.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Highlight = /*#__PURE__*/function () {
  function Highlight(highlight) {
    _classCallCheck(this, Highlight);

    this.description = highlight["description"], this.id = highlight["id"], this.mediaUrl = highlight["mediaUrl"], this.highlightType = highlight["highlightType"], this.teamId = highlight["teamId"];
  }

  _createClass(Highlight, [{
    key: "pushHighlightToHighlightType",
    value: function pushHighlightToHighlightType() {
      if (this.highlightType.toLowerCase() === "win") {
        gameDetails.winHighlights.push(this);
      } else if (this.highlightType.toLowerCase() === "loss") {
        gameDetails.lossHighlights.push(this);
      }
    }
  }], [{
    key: "createHighlight",
    value: function createHighlight(highlightData) {
      var highlight = {};
      highlight["description"] = highlightData.attributes.description;
      highlight["mediaUrl"] = highlightData.attributes.media_url;
      highlight["highlightType"] = highlightData.attributes.highlight_type;
      highlight["id"] = highlightData.id;
      highlight["teamId"] = highlightData.relationships.team.data.id;
      var newHighlight = new Highlight(highlight);
      return newHighlight;
    }
  }, {
    key: "getHighlightMedia",
    value: function getHighlightMedia() {
      var highlightParams = {
        team_id: Team.all.find(function (element) {
          return element.id == gameDetails.gameMascot.teamId;
        }).id,
        user_id: document.querySelector("#current-user-info").dataset.currentUser,
        highlight_type: gameDetails.winner === "Arkansas" ? "Loss" : "Win"
      };
      var options = {
        method: "POST",
        body: JSON.stringify(highlightParams),
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      };
      fetch("http://localhost:3000/highlights/team_highlights", options).then(function (resp) {
        return resp.json();
      }).then(function (json) {
        return Highlight.addHighlights(json);
      });
    }
  }, {
    key: "addHighlights",
    value: function addHighlights(json) {
      json.data.forEach(function (element) {
        var newHighlight = Highlight.createHighlight(element);
        newHighlight.pushHighlightToHighlightType();
      });
    }
  }, {
    key: "parseAndDisplayAllHighlights",
    value: function parseAndDisplayAllHighlights(json) {
      var teamDivs = Array.from(document.querySelector("div#highlight-teams").children);
      json.data.forEach(function (element) {
        var divForThisHighlight = teamDivs.find(function (div) {
          return div.dataset.teamId == element.relationships.team.data.id;
        });
        var team = Team.all.find(function (team) {
          return team.id == divForThisHighlight.dataset.teamId;
        });
        var ul = divForThisHighlight.firstElementChild;
        var newLi = document.createElement("li");
        newLi.innerText = "".concat(team.shorthandName, " ").concat(element.attributes.highlight_type, " -- DATE");
        newLi.dataset.highlightId = element.id;
        newLi.className = "all-highlights pl-8 text-sm text-black cursor-pointer all-highlights hover:underline";
        newLi.dataset.highlightId = element.id;
        ul.appendChild(newLi);
        UserHighlight.disableHighlightsThatAreNotUserHighlights();
        newLi.addEventListener("click", showHighlightDetails);
      });
    }
  }, {
    key: "displayHighlights",
    value: function displayHighlights() {
      debugger;
      var backgroundDiv = document.createElement("div");
      var highlightsDiv = createHighlightsDiv();
      backgroundDiv.id = "background-div";
      backgroundDiv.className = "w-full h-5/6 bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative";
      highlightsDiv.id = "highlight-teams"; // populate highlights div with each team

      Team.all.forEach(function (element) {
        var newTeamDiv = document.createElement("div");
        var newUl = document.createElement("ul");
        newTeamDiv.dataset.teamId = element.id;
        newTeamDiv.innerText = element.shorthandName;
        newTeamDiv.appendChild(newUl);
        highlightsDiv.appendChild(newTeamDiv);
      });
      var newSpan = document.createElement("span");
      newSpan.innerHTML = "&#88;";
      newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1";
      highlightsDiv.insertAdjacentElement("afterbegin", newSpan);
      newSpan.addEventListener("click", function () {
        backgroundDiv.remove();
        document.querySelector("div#main-div").classList.remove("filter", "blur-md");
        document.querySelector("div#form-background-div").classList.add("hidden");
      });
      fetch("http://localhost:3000/highlights").then(function (resp) {
        return resp.json();
      }).then(function (json) {
        return Highlight.parseAndDisplayAllHighlights(json);
      });
      backgroundDiv.appendChild(highlightsDiv);
      document.querySelector("div#form-background-div").appendChild(backgroundDiv);
      document.querySelector("div#main-div").className += ' filter blur-md';
      document.querySelector("div#form-background-div").classList.remove("hidden");
    }
  }, {
    key: "addANewHighlight",
    value: function addANewHighlight() {
      var backgroundDiv = document.createElement("div");
      var highlightsDiv = createHighlightsDiv();
      backgroundDiv.id = "background-div";
      backgroundDiv.className = "w-5/6 h-5/6 bg-opacity-0 flex justify-center align-center place-items-center space-x-8 relative";
      highlightsDiv.id = "new-highlight";
      highlightsDiv.className += " space-y-3 overflow-auto z-10";
      backgroundDiv.appendChild(highlightsDiv);
      var newSpan = document.createElement("span");
      newSpan.innerHTML = "&#88;";
      newSpan.id = "close-new-highlight-form";
      newSpan.className = "absolute right-0 top-0 cursor-pointer pr-1";
      highlightsDiv.insertAdjacentElement("afterbegin", newSpan);
      document.querySelector("div#form-background-div").appendChild(backgroundDiv);
      document.querySelector("div#main-div").className += ' filter blur-md';
      document.querySelector("div#form-background-div").classList.remove("hidden");
      document.querySelector("#close-new-highlight-form").addEventListener("click", Highlight.closeNewHighlightForm);
      var teamNameWithId = Team.all.map(function (team) {
        return [team.shorthandName, team.id];
      });
      highlightsDiv.innerHTML += "\n      <h1 class=\"font-serif[1] font-bold text-2xl text-center mt-2\">New Highlight</h1>\n      <form id=\"create-highlight-form\">\n        <div class=\"flex flex-col space-y-3\">\n          <div class=\"w-full flex flex-col\">\n            <label class=\"mx-4\">Team</label>\n            <select id=\"team-id\" class=\"border-black border-2 mx-4 rounded-md bg-gray-200 w-3/4 text-md\">\n            </select>\n          </div>\n          <div class=\"w-full flex flex-col\">\n            <label class=\"mx-4\">Description</label>\n            <textarea id=\"description\" class=\"border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md\" rows=\"7\"></textarea> \n          </div>\n          <div class=\"w-full flex flex-col\">\n            <label class=\"mx-4\">Media Url</label>\n            <textarea id=\"media-url\" class=\"border-black border-2 mx-4 rounded-md bg-gray-200 w-11/12 text-md\" rows=\"7\"></textarea> \n          </div>\n          <div class=\"w-full h-1/4 flex flex-col\">\n            <label class=\"mx-4\">Highlight Type</label>\n            <select id=\"highlight-type\" class=\"border-black border-2 mx-4 rounded-md bg-gray-200 w-3/4 text-md\">\n              <option value=\"Win\">Win</option>\n              <option value=\"Loss\">Loss</option>\n              <option value=\"Arkansas Highlight\">Arkansas Highlight</option>\n              <option value=\"Arkansas fail\">Arkansas Fail</option>\n            </select>\n          </div>\n          <div class=\"flex place-items-center justify-center pb-5\">\n            <input type=\"submit\" value=\"Create Highlight\" class=\"bg-blue-400 font-white w-36 h-10 rounded-md whitespace-normal\">\n          </div> \n        <div>\n      <form>\n    ";
      var teamSelect = document.querySelector("#team-id");
      teamNameWithId.forEach(function (team) {
        teamSelect.innerHTML += "<option value='".concat(team[1], "'>").concat(team[0], "</option");
      });
      document.querySelector("#create-highlight-form").addEventListener("submit", Highlight.submitHighlight);
    }
  }, {
    key: "closeNewHighlightForm",
    value: function closeNewHighlightForm() {
      document.querySelector("#background-div").remove();
      document.querySelector("div#main-div").classList.remove("filter", "blur-md");
      document.querySelector("div#form-background-div").classList.add("hidden");
    }
  }, {
    key: "submitHighlight",
    value: function submitHighlight(event) {
      event.preventDefault();
      var data = {
        highlight: {
          team_id: document.querySelector("#team-id").value,
          description: document.querySelector("#description").value,
          media_url: document.querySelector("#media-url").value,
          highlight_type: document.querySelector("#highlight-type").value,
          user_id: document.querySelector("#current-user-info").dataset.currentUser
        }
      };
      fetch('http://localhost:3000/highlights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(function (resp) {
        return resp.json();
      }).then(function (json) {
        return UserHighlight.createNewUserHighlight(json);
      });
    }
  }]);

  return Highlight;
}();
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
},{}]},{},["../../../../../../../home/sbb3391/.nvm/versions/node/v15.1.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","highlight.js"], null)
//# sourceMappingURL=/highlight.d2b923bf.js.map