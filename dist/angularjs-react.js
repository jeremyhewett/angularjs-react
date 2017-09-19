(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "angular"], factory);
	else if(typeof exports === 'object')
		exports["directify"] = factory(require("react"), require("react-dom"), require("angular"));
	else
		root["directify"] = factory(root["react"], root["ReactDOM"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _angular = __webpack_require__(3);

var _angular2 = _interopRequireDefault(_angular);

var _utility = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * AngularJSReact
                                                                                                                                                           *
                                                                                                                                                           * Easily consume React components in an Angular app.
                                                                                                                                                           * Three types of attributes are available, input prop attributes, callback prop attributes, and
                                                                                                                                                           * ref attributes.
                                                                                                                                                           *
                                                                                                                                                           * Input Attributes
                                                                                                                                                           * prefix: re-in-
                                                                                                                                                           * value: an angular expression that is watched (deeply) and the value is passed to
                                                                                                                                                           * the react component.
                                                                                                                                                           *
                                                                                                                                                           * Callback Attributes
                                                                                                                                                           * prefix: re-cb-
                                                                                                                                                           * value: an angular expression that is evaluated when the callback is called.
                                                                                                                                                           *        An `args` variable is available to the expression which will contain an array of the
                                                                                                                                                           *        arguments from the react callback.
                                                                                                                                                           *
                                                                                                                                                           * Ref Attribute
                                                                                                                                                           * name: re-ref
                                                                                                                                                           * value: an angular expression that is evaluated when the ref callback is called by react.
                                                                                                                                                           *        the reference will be available as `ref` when the expression is evaluated.
                                                                                                                                                           *
                                                                                                                                                           * Regular HTML attributes as well as many angular directives can still be used in conjunction
                                                                                                                                                           * with the above attributes.
                                                                                                                                                           *
                                                                                                                                                           * @example
                                                                                                                                                           *
                                                                                                                                                           * JS
                                                                                                                                                           * import directify from 'angularjs-react.umd.js';
                                                                                                                                                           * import MyComponent = from 'myComponent.jsx';
                                                                                                                                                           * angular.module('app').directive('myComponent', directify(MyComponent));
                                                                                                                                                           *
                                                                                                                                                           * HTML
                                                                                                                                                           * <my-component
                                                                                                                                                           *   re-in-value="data.value"
                                                                                                                                                           *   re-cb-on-open="handleOpenEvent(args[0])"
                                                                                                                                                           *   re-ref="controller.reactRef = ref"
                                                                                                                                                           *   ng-class="{stylish: true}"
                                                                                                                                                           *   id="my-component-123">
                                                                                                                                                           *     <span>{{someAngularExpression}}</span>
                                                                                                                                                           * </my-component>
                                                                                                                                                           */

var INPUT_PREFIX = 'reIn';
var INPUT_PREFIX_REGEXP = new RegExp('^' + INPUT_PREFIX + '[A-Z]');
var INPUT_ATTR_PREFIX = 're-in-';
var INPUT_ATTR_PREFIX_REGEXP = new RegExp('^' + INPUT_ATTR_PREFIX);
var IINPUT_PREFIX = 'reIin';
var IINPUT_PREFIX_REGEXP = new RegExp('^' + IINPUT_PREFIX + '[A-Z]');
var IINPUT_ATTR_PREFIX = 're-iin-';
var IINPUT_ATTR_PREFIX_REGEXP = new RegExp('^' + IINPUT_ATTR_PREFIX);
var CALLBACK_PREFIX = 'reCb';
var CALLBACK_PREFIX_REGEXP = new RegExp('^' + CALLBACK_PREFIX + '[A-Z]');
var REF_ATTR = 'reRef';
var REF_ATTR_REGEXP = new RegExp('^' + REF_ATTR + '$');

var AngularjsReact = function AngularjsReact(component, $compile, $timeout) {
  var _this = this;

  _classCallCheck(this, AngularjsReact);

  this.restrict = 'E';
  this.scope = true;

  this.compile = function (element) {
    var markup = {};
    markup.hasChildren = _this.acceptsChildren && !!element.html().trim();
    if (markup.hasChildren) {
      markup.innerHtml = element.html();
      markup.contents = element.contents();
      markup.contents.splice(0).forEach(function (e) {
        _angular2.default.element(e).detach();
      });
    }
    return _this.getLinker(markup);
  };

  this.getLinker = function (markup) {
    return function ($scope, $elem, $attrs) {
      var instance = new Instance(_this, markup);
      instance.link($scope, $elem, $attrs);
    };
  };

  this.acceptsChildren = !component.propTypes || !!component.propTypes.children;
  this.component = _react2.default.createFactory(component);
  this.$compile = $compile;
  this.$timeout = $timeout;
};

var Instance = function Instance(Directive, markup) {
  var _this2 = this;

  _classCallCheck(this, Instance);

  this.link = function ($scope, $elem, $attrs) {
    _this2.$scope = $scope;
    _this2.elem = $elem[0];
    _this2.$attrs = $attrs;

    _this2.replace = _this2.$attrs.reReplace || _this2.$attrs.reReplace === "";
    _this2.nodeIndex = _this2.elem.parentNode && [].concat(_toConsumableArray(_this2.elem.parentNode.childNodes)).indexOf(_this2.elem);
    _this2.reactParent = _this2.replace ? _this2.elem.cloneNode(false) : _this2.elem;

    if (_this2.markup.hasChildren) {
      var content = void 0;
      try {
        content = _this2.$compile(_this2.markup.innerHtml)(_this2.$scope);
      } catch (e) {
        content = _this2.markup.contents;
      }
      _this2.angularParent = _angular2.default.element(_this2.elem.cloneNode(false));
      _this2.angularParent.append(content);
    }

    _this2.setupInputs();
    _this2.setupCallbacks();
    _this2.setupRefCallbacks();

    _this2.$scope.$on('$destroy', function () {
      _reactDom2.default.unmountComponentAtNode(_this2.reactParent);
    });

    _this2.scheduleRender();
  };

  this.transclude = function (ref, content) {
    if (_this2.renderPending) {
      var node = _reactDom2.default.findDOMNode(ref);
      _angular2.default.element(node).replaceWith(content);
    }
  };

  this.getChildren = function (parent) {
    if ([].slice.call(parent[0].attributes || []).filter(function (a) {
      return a.name === 're-react';
    }).length) {
      var result = parent.contents().splice(0).filter(function (e) {
        return e.tagName;
      }).map(function (e) {
        var $elem = _angular2.default.element(e);
        var inputAttrs = [].slice.call(e.attributes || []).filter(function (a) {
          return a.name.match(INPUT_ATTR_PREFIX_REGEXP);
        });
        var inputProps = (0, _utility._)(inputAttrs).keyBy(function (a) {
          return a.name.substr(INPUT_ATTR_PREFIX.length, 1).toLowerCase() + (0, _utility.toCamelCase)(a.name.substr(INPUT_ATTR_PREFIX.length + 1));
        }).value();
        Object.keys(inputProps).forEach(function (prop) {
          inputProps[prop] = $elem.scope().$eval(inputProps[prop].value);
        });
        return _react2.default.createElement(e.tagName, inputProps, _this2.getChildren($elem));
      });
      if (result.length > 0) {
        return result.length > 1 ? result : result[0];
      }
    }
    return _react2.default.createElement('outlet', { ref: function ref(_ref) {
        return _this2.transclude(_ref, parent.contents());
      } });
  };

  this.render = function () {
    var component = _this2.component(_this2.props);
    var children = _this2.markup.hasChildren ? _this2.getChildren(_this2.angularParent) : undefined;
    _reactDom2.default.render(_react2.default.createElement(component.type, _angular2.default.extend({}, _extends({}, component.props), { ref: function ref(_ref2) {
        if (_this2.replace) {
          _angular2.default.element(_this2.elem.parentNode.childNodes[_this2.nodeIndex]).replaceWith(_angular2.default.element(_this2.reactParent).contents());
        }
        _this2.refCallbacks.forEach(function (cb) {
          return cb(_ref2);
        });
      } }), children), _this2.reactParent);
    _this2.renderPending = false;
  };

  this.scheduleRender = function () {
    if (!_this2.renderPending) {
      _this2.$timeout(_this2.render);
      _this2.renderPending = true;
    }
  };

  this.setupInputs = function () {
    var inputAttrs = Object.keys(_this2.$attrs).filter(function (key) {
      return key.match(INPUT_PREFIX_REGEXP);
    });
    var inputProps = inputAttrs.map(function (key) {
      return key.substr(INPUT_PREFIX.length, 1).toLowerCase() + key.substr(INPUT_PREFIX.length + 1);
    });
    inputAttrs.forEach(function (key, i) {
      _this2.$scope.$watch(_this2.$attrs[key], function (value) {
        _this2.props[inputProps[i]] = value;
        _this2.scheduleRender();
      }, true);
      _this2.$scope.$watch(_this2.$attrs[key], function (value) {
        _this2.props[inputProps[i]] = value;
        _this2.scheduleRender();
      });
    });

    //Immutable inputs
    var iinputAttrs = Object.keys(_this2.$attrs).filter(function (key) {
      return key.match(IINPUT_PREFIX_REGEXP);
    });
    var iinputProps = iinputAttrs.map(function (key) {
      return key.substr(IINPUT_PREFIX.length, 1).toLowerCase() + key.substr(IINPUT_PREFIX.length + 1);
    });
    iinputAttrs.forEach(function (key, i) {
      _this2.$scope.$watch(_this2.$attrs[key], function (value) {
        _this2.props[iinputProps[i]] = value;
        _this2.scheduleRender();
      });
    });
  };

  this.setupCallbacks = function () {
    var callbackAttrs = Object.keys(_this2.$attrs).filter(function (key) {
      return key.match(CALLBACK_PREFIX_REGEXP);
    });
    var callbackProps = callbackAttrs.map(function (key) {
      return key.substr(CALLBACK_PREFIX.length, 1).toLowerCase() + key.substr(CALLBACK_PREFIX.length + 1);
    });
    callbackAttrs.forEach(function (key, i) {
      _this2.props[callbackProps[i]] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this2.$timeout(function () {
          return _this2.$scope.$eval(_this2.$attrs[key], { arg: args[0], args: args });
        });
      };
    });
  };

  this.setupRefCallbacks = function () {
    _this2.refCallbacks = Object.keys(_this2.$attrs).filter(function (key) {
      return key.match(REF_ATTR_REGEXP);
    }).map(function (key) {
      return function (ref) {
        return _this2.$scope.$eval(_this2.$attrs[key], { ref: ref });
      };
    });
  };

  this.component = Directive.component;
  this.$compile = Directive.$compile;
  this.$timeout = Directive.$timeout;
  this.markup = markup;
  this.renderPending = false;
  this.props = {};
};

exports.default = function (component) {
  var factory = function factory($compile, $timeout) {
    return new AngularjsReact(component, $compile, $timeout);
  };
  factory.$inject = ['$compile', '$timeout'];
  return factory;
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ = function _(target) {
  var accumulator = target;
  var api = {
    keyBy: function keyBy(fn) {
      var result = {};
      accumulator.forEach(function (value, i) {
        result[fn(value, i)] = value;
      });
      accumulator = result;
      return api;
    },
    isNil: function isNil() {
      return typeof accumulator === 'undefined' || accumulator === null;
    },
    value: function value() {
      return accumulator;
    }
  };
  return api;
};

var toCamelCase = function toCamelCase(attribute) {
  return attribute.replace(/-([a-zA-Z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

exports._ = _;
exports.toCamelCase = toCamelCase;

/***/ })
/******/ ]);
});