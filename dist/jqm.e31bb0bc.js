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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var user_action = function user_action() {};

var save = function save(tag, json) {
  localStorage[tag] = JSON.stringify(json);
};

var load = function load(tag) {
  return localStorage[tag];
};

var parse_hw = function parse_hw(predmets) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = predmets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var predmet = _step.value;
      var hw2 = predmet.from == 'khorsun_dv@dlit.dp.ua';
      var hw1 = predmet.from == 'anton.gimnasium@gmail.com';
      var x = $("<div data-role=\"collapsible\" data-filtertext=\"".concat(predmet.subject, "\">")).html("<h3>".concat(predmet.subject, "</h3>").concat(predmet.body));
      if (hw2) x.appendTo($('#hw2'));else if (hw1) x.appendTo($('#hw1'));else x.appendTo($('#cool'));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
};

var getDate = function getDate(d) {
  console.log(d);
  d = new Date(d);
  return [d.getDate(), d.getMonth() + 1].join('/');
};

var clear_cache =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var x, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(navigator.serviceWorker == null)) {
              _context.next = 3;
              break;
            }

            console.error('Cant remove cache');
            return _context.abrupt("return");

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return navigator.serviceWorker.getRegistrations();

          case 6:
            x = _context.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 10;

            for (_iterator2 = x[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              i = _step2.value;
              i.unregister();
            }

            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](10);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError2) {
              _context.next = 24;
              break;
            }

            throw _iteratorError2;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t1 = _context["catch"](3);
            console.error(_context.t1);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 28], [10, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function clear_cache() {
    return _ref.apply(this, arguments);
  };
}();

var load_hw =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var predmets;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!('hw' in localStorage)) {
              _context2.next = 4;
              break;
            }

            predmets = JSON.parse(localStorage.hw);
            _context2.next = 11;
            break;

          case 4:
            _context2.next = 6;
            return fetch('https://homework-63c7.restdb.io/rest/email_inbound', {
              method: 'GET',
              headers: {
                'x-apikey': '5c6ecf1828ca2e129e8696e8'
              }
            });

          case 6:
            predmets = _context2.sent;
            _context2.next = 9;
            return predmets.json();

          case 9:
            predmets = _context2.sent;
            localStorage.hw = JSON.stringify(predmets);

          case 11:
            if ('message' in predmets) {
              $.unblockUI();
              $.blockUI({
                message: 'Внимание! Сервер заспамлен, сайт временно закрыт.'
              });
            }

            parse_hw(predmets);
            $('#hw1 #hw2').collapsibleset('refresh');
            $.unblockUI();

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function load_hw() {
    return _ref2.apply(this, arguments);
  };
}();

var init_chat = function init_chat() {};

var calc_food = function calc_food() {
  var result = $('#food-result');
  var count_by = {
    '0': 0,
    '5': 0,
    '30': 0,
    '35': 0
  };
  var group = $('#food-group')[0].form.children[0].children;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = group[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var chbox = _step3.value;
      console.log(chbox);
      chbox = chbox.childNodes[1];

      if (!chbox.checked) {
        count_by[chbox.name]++;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  console.log(count_by);
  var price = count_by['5'] * 5 + count_by['30'] * 30 + count_by['35'] * 35;
  result.html("<p>".concat(count_by['0'] + count_by['5'] + count_by['30'] + count_by['35'], " \u0447\u0435\u043B\u043E\u0432\u0435\u043A</p><p>").concat(count_by['0'], " \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0438\u043A\u043E\u0432</p><p>").concat(count_by['5'], " \u043F\u043E 5 \u0433\u0440\u043D</p><p>").concat(count_by['30'], " \u043F\u043E 30 \u0433\u0440\u043D</p><p>").concat(count_by['35'], " \u043F\u043E 35</p><p>\u0418\u0442\u043E\u0433\u043E ").concat(price, " \u0433\u0440\u043D.</p>"));
};

var role_change = function role_change() {
  var user_action_btn = $('#user_action');
  user_action_btn.hide();
  var role = localStorage.role;
  var role_friendly_names = {
    food: 'Счетчик порций'
  };
  var role_urls = {
    food: '#food'
  };
  var role_icons = {
    food: 'user'
  };

  if (role !== 'default') {
    user_action_btn.attr('href', role_urls[role]);
    user_action_btn.html(role_friendly_names[role]);
    user_action_btn.buttonMarkup({
      icon: role_icons[role]
    });
    user_action_btn.show();
  } else {
    user_action_btn.hide();
  }
};

$(function () {
  $.blockUI({
    message: 'Загрузка домашки...'
  });
  load_hw();

  if (localStorage.role == null) {
    localStorage.role = 'default';
  }

  $('input[type=radio][name=role]').change(function () {
    localStorage.role = $('input[name=role]').toArray().filter(function (x) {
      return x.checked;
    })[0].id || 'role_default';
    role_change();
  }); // $('#settings div a[data-icon=back]').on('click', user_action)

  $(document).on('swiperight', '.ui-page', function () {
    if ($.mobile.activePage.attr('id') == 'main') $('#settings-panel').panel('open');else $.mobile.changePage('#main', {
      transition: 'slide',
      reverse: true
    });
  });
  var group = $('#food-group')[0].form;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = group[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var child = _step4.value;
      $(child).on('change', calc_food);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  role_change();
});
},{}],"../../.nvm/versions/node/v10.15.3/pnpm-global/2/node_modules/.registry.npmjs.org/parcel-bundler/1.12.2/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33469" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../../.nvm/versions/node/v10.15.3/pnpm-global/2/node_modules/.registry.npmjs.org/parcel-bundler/1.12.2/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/jqm.e31bb0bc.js.map