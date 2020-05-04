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
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/img/battery.png":[function(require,module,exports) {
module.exports = "/battery.bc6b65f7.png";
},{}],"../src/img/camera.png":[function(require,module,exports) {
module.exports = "/camera.e7eaaa7b.png";
},{}],"../src/img/cloud.png":[function(require,module,exports) {
module.exports = "/cloud.250512ee.png";
},{}],"../src/img/compass.png":[function(require,module,exports) {
module.exports = "/compass.41bb0081.png";
},{}],"../src/img/heart.png":[function(require,module,exports) {
module.exports = "/heart.729fe681.png";
},{}],"../src/img/phone.png":[function(require,module,exports) {
module.exports = "/phone.c5fdd1d9.png";
},{}],"../src/img/star.png":[function(require,module,exports) {
module.exports = "/star.c40f9a8d.png";
},{}],"../src/img/television.png":[function(require,module,exports) {
module.exports = "/television.1b4d6da2.png";
},{}],"../src/app.js":[function(require,module,exports) {
"use strict";

require("./scss/main.scss");

var _battery = _interopRequireDefault(require("./img/battery.png"));

var _camera = _interopRequireDefault(require("./img/camera.png"));

var _cloud = _interopRequireDefault(require("./img/cloud.png"));

var _compass = _interopRequireDefault(require("./img/compass.png"));

var _heart = _interopRequireDefault(require("./img/heart.png"));

var _phone = _interopRequireDefault(require("./img/phone.png"));

var _star = _interopRequireDefault(require("./img/star.png"));

var _television = _interopRequireDefault(require("./img/television.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//UI variables
var startBtn = document.querySelector(".start");
var cards = document.querySelectorAll(".card-container");
var cardBox = document.querySelectorAll(".card");
var moveDisplay = document.querySelector(".move-display");
var minDisplay = document.querySelector(".mins");
var secDisplay = document.querySelector(".secs");
var statusDisplay = document.querySelector(".status"); //Gameplay variables

var cardDeck = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var compare = [];
var matchTracker = 0;
var moves = 0;
var gameActive = 0; //Timer variables

var secs = 0;
var mins = 0;
var clock; //Function to shuffle cards

var shuffle = function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}; //Timer function


var timer = function timer() {
  clock = setInterval(function () {
    //Check if seconds are equal to 50 and set to -1
    if (secs === 59) {
      secs = -1; // Next increment will display as 0
      //Add to minutes

      mins++;
    } //add to seconds and display in UI


    secs++;
    secDisplay.innerHTML = secs;
    minDisplay.innerHTML = mins;
  }, 1000);
}; //Start button event listener


startBtn.addEventListener("click", function (e) {
  //Shuffle cards and reset all game UI's
  var deck = shuffle(cardDeck);
  gameActive = 1;
  compare = [];
  matchTracker = 0;
  moves = 0;
  secs = 0;
  mins = 0;
  secDisplay.innerHTML = secs;
  minDisplay.innerHTML = mins;
  statusDisplay.textContent = "Game commenced!!";
  moveDisplay.innerHTML = moves;
  clearInterval(clock);
  timer(); //Loop through card container and apply styles

  cardBox.forEach(function (card, index) {
    card.style.backgroundColor = "#2e3d49";
    card.style.visibility = "visible";
    card.style.boxShadow = "0 .2rem .2rem .2rem rgba(0, 0, 0, .5)";
  }); //Loop through inner card and apply styles and images

  cards.forEach(function (card, index) {
    card.style.display = "flex";
    card.style.opacity = "0"; //Declare html variable

    var html; //Test which deck index is assigned to each card

    if (deck[index] === 1) {
      html = "\n            <img class=\"icon\" src=\"".concat(_battery.default, "\">\n            <span class=\"card-id\">1</span>\n            ");
    } else if (deck[index] === 2) {
      html = "\n            <img class=\"icon\" src=\"".concat(_camera.default, "\">\n            <span class=\"card-id\">2</span>\n             ");
    } else if (deck[index] === 3) {
      html = "\n            <img class=\"icon\" src=\"".concat(_cloud.default, "\">\n            <span class=\"card-id\">3</span>\n             ");
    } else if (deck[index] === 4) {
      html = "\n            <img class=\"icon\" src=\"".concat(_compass.default, "\">\n            <span class=\"card-id\">4</span>\n             ");
    } else if (deck[index] === 5) {
      html = "\n            <img class=\"icon\" src=\"".concat(_heart.default, "\">\n            <span class=\"card-id\">5</span>\n             ");
    } else if (deck[index] === 6) {
      html = "\n            <img class=\"icon\" src=\"".concat(_phone.default, "\">\n            <span class=\"card-id\">6</span>\n             ");
    } else if (deck[index] === 7) {
      html = "\n            <img class=\"icon\" src=\"".concat(_star.default, "\">\n            <span class=\"card-id\">7</span>\n             ");
    } else if (deck[index] === 8) {
      html = "\n            <img class=\"icon\" src=\"".concat(_television.default, "\">\n            <span class=\"card-id\">8</span>\n             ");
    }

    ; //Apply html to card

    card.innerHTML = html;
  });
}); //Event listener for cards

cards.forEach(function (card, index) {
  card.addEventListener("click", function (e) {
    //Check game is active
    if (gameActive === 1) {
      //Chaeck all cards have not been matched
      if (matchTracker < 8) {
        //Create card object and take card number and index number from selected card
        var cardObj = {
          card: card.textContent.trim(),
          id: index
        }; //Push card object to comparrison array

        compare.push(cardObj);
        card.style.opacity = "1"; //Test to see if there has been a match

        if (compare.length === 2 && compare[0].card === compare[1].card) {
          //If user clicks same card, alert that they can not do this and pop the card off the compare array
          if (compare[0].id === compare[1].id) {
            statusDisplay.innerHTML = "You can't pick the same card twice";
            compare.pop();
          } else {
            //If match
            //Alert that there has been a match
            statusDisplay.innerHTML = "You matched a pair!!"; //Set time to hide cards

            setTimeout(function () {
              //Hide the matched cards
              cards[compare[0].id].style.display = "none";
              cards[compare[1].id].style.display = "none";
              cardBox[compare[0].id].style.backgroundColor = "none";
              cardBox[compare[1].id].style.backgroundColor = "none";
              cardBox[compare[0].id].style.background = "none";
              cardBox[compare[1].id].style.background = "none";
              cardBox[compare[0].id].style.boxShadow = "none";
              cardBox[compare[1].id].style.boxShadow = "none";
              cardBox[compare[0].id].style.visibility = "hidden";
              cardBox[compare[1].id].style.visibility = "hidden"; //Set compare array back to empty

              compare = [];
            }, 1000); //Add one to the matchTracker

            matchTracker += 1; //Add one to the moveTracker

            moves += 1; //Check if all matches have been found

            if (matchTracker === 8) {
              statusDisplay.innerHTML = "All matches found, you won in ".concat(mins, " minute ").concat(secs, " seconds and in ").concat(moves, " moves"); //Stop clock

              clearInterval(clock); //Change game to inactive

              gameActive = 0;
            }
          }
        } else if (compare.length === 2 && compare[0].card !== compare[1].card) {
          //If not match
          //Alert that there has been no match
          statusDisplay.innerHTML = "No match, try again!!"; //Set time to fade images away

          setTimeout(function () {
            cards[compare[0].id].style.opacity = "0";
            cards[compare[1].id].style.opacity = "0"; //Set compare array back to empty

            compare = [];
          }, 1000); //Add to moves counter

          moves += 1;
        } //Display moves in UI


        moveDisplay.textContent = moves;
      }
    } else {
      statusDisplay.innerHTML = "You need to click start to play!!";
    }
  });
});
},{"./scss/main.scss":"../src/scss/main.scss","./img/battery.png":"../src/img/battery.png","./img/camera.png":"../src/img/camera.png","./img/cloud.png":"../src/img/cloud.png","./img/compass.png":"../src/img/compass.png","./img/heart.png":"../src/img/heart.png","./img/phone.png":"../src/img/phone.png","./img/star.png":"../src/img/star.png","./img/television.png":"../src/img/television.png"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62039" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/app.js"], null)
//# sourceMappingURL=/app.581aa3f0.js.map