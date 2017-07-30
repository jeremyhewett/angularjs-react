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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([$\w][$\w\d]*))\s+in\s+(.*)$/;
var INPUT_PREFIX = 'reIn';
var INPUT_PREFIX_REGEXP = new RegExp('^' + INPUT_PREFIX + '[A-Z]');
var INPUT_ATTR_PREFIX = 're-in-';
var INPUT_ATTR_PREFIX_REGEXP = new RegExp('^' + INPUT_ATTR_PREFIX);
var CALLBACK_PREFIX = 'reCb';
var CALLBACK_PREFIX_REGEXP = new RegExp('^' + CALLBACK_PREFIX + '[A-Z]');
var REF_ATTR = 'reRef';
var REF_ATTR_REGEXP = new RegExp('^' + REF_ATTR + '$');

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

var AngularjsReact = function AngularjsReact(component, $compile, $timeout) {
  _classCallCheck(this, AngularjsReact);

  _initialiseProps.call(this);

  this.acceptsChildren = !component.propTypes || !!component.propTypes.children;
  this.component = _react2.default.createFactory(component);
  this.$compile = $compile;
  this.$timeout = $timeout;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.restrict = 'E';
  this.scope = true;

  this.compile = function (element) {
    var instance = {};
    instance.hasChildren = _this.acceptsChildren && !!element.html().trim();
    if (instance.hasChildren) {
      instance.innerHtml = element.html();
      element.contents().splice(0).forEach(function (e) {
        _angular2.default.element(e).detach();
      });
    }
    return _this.link(instance);
  };

  this.link = function (instance) {
    return function ($scope, $elem, $attrs) {
      var elem = $elem[0];
      var shadowParent = void 0;
      if (instance.hasChildren) {
        var content = void 0;
        try {
          content = _this.$compile(instance.innerHtml)($scope);
        } catch (e) {
          content = _angular2.default.element(instance.innerHtml);
        }
        shadowParent = _angular2.default.element(elem.cloneNode(false));
        shadowParent.append(content);
      }

      var props = {};
      var refCallbacks = void 0;
      var renderPending = false;

      var transclude = function transclude(ref, content) {
        if (renderPending) {
          /* eslint-disable react/no-find-dom-node */
          var node = _reactDom2.default.findDOMNode(ref);
          /* eslint-disable no-undef */
          _angular2.default.element(node).replaceWith(content);
        }
      };

      var getChildren = function getChildren(element) {
        if ([].slice.call(element[0].attributes).filter(function (a) {
          return a.name === 're-react';
        }).length) {
          var result = element.contents().splice(0).map(function (e) {
            var el = _angular2.default.element(e);
            var inputAttrs = [].slice.call(e.attributes).filter(function (a) {
              return a.name.match(INPUT_ATTR_PREFIX_REGEXP);
            });
            var inputProps = _(inputAttrs).keyBy(function (a) {
              return a.name.substr(INPUT_ATTR_PREFIX.length, 1).toLowerCase() + a.name.substr(INPUT_ATTR_PREFIX.length + 1);
            }).value();
            Object.keys(inputProps).forEach(function (prop) {
              inputProps[prop] = el.scope().$eval(inputProps[prop].value);
            });
            return _react2.default.createElement(e.tagName, inputProps, getChildren(el));
          });
          if (result.length > 0) {
            return result.length > 1 ? result : result[0];
          }
        }
        return _react2.default.createElement('outlet', { ref: function ref(_ref) {
            return transclude(_ref, element.contents());
          } });
      };

      var render = function render() {
        if (!renderPending) {
          _this.$timeout(function () {
            var component = _this.component(props);
            var children = instance.hasChildren ? getChildren(shadowParent) : undefined;
            _reactDom2.default.render(_react2.default.createElement(component.type, _angular2.default.extend({}, _extends({}, component.props), { ref: function ref(_ref2) {
                return refCallbacks.forEach(function (cb) {
                  return cb(_ref2);
                });
              } }), children), elem);
            renderPending = false;
          });
          renderPending = true;
        }
      };

      var inputAttrs = Object.keys($attrs).filter(function (key) {
        return key.match(INPUT_PREFIX_REGEXP);
      });
      var inputProps = inputAttrs.map(function (key) {
        return key.substr(INPUT_PREFIX.length, 1).toLowerCase() + key.substr(INPUT_PREFIX.length + 1);
      });
      inputAttrs.forEach(function (key, i) {
        var matchOptions = $attrs[key].match(OPTIONS_REGEXP);
        if (matchOptions) {
          var rawOptions = {
            value: matchOptions[1],
            as: matchOptions[2],
            itemName: matchOptions[3],
            collection: matchOptions[4]
          };

          var onChange = function onChange(collection) {
            var locals = {};
            props[inputProps[i]] = collection.map(function (item) {
              locals[rawOptions.itemName] = item;
              var value = $scope.$eval(rawOptions.value, locals);
              return _(rawOptions.as).isNil() ? value : { value: value, label: $scope.$eval(rawOptions.as, locals) };
            });
            render();
          };
          $scope.$watch(rawOptions.collection, onChange, true);
          $scope.$watch(rawOptions.collection, onChange);
        } else {
          $scope.$watch($attrs[key], function (value) {
            props[inputProps[i]] = value;
            render();
          }, true);
          $scope.$watch($attrs[key], function (value) {
            props[inputProps[i]] = value;
            render();
          });
        }
      });

      var callbackAttrs = Object.keys($attrs).filter(function (key) {
        return key.match(CALLBACK_PREFIX_REGEXP);
      });
      var callbackProps = callbackAttrs.map(function (key) {
        return key.substr(CALLBACK_PREFIX.length, 1).toLowerCase() + key.substr(CALLBACK_PREFIX.length + 1);
      });
      callbackAttrs.forEach(function (key, i) {
        props[callbackProps[i]] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.$timeout(function () {
            return $scope.$eval($attrs[key], { args: args });
          });
        };
      });

      refCallbacks = Object.keys($attrs).filter(function (key) {
        return key.match(REF_ATTR_REGEXP);
      }).map(function (key) {
        return function (ref) {
          return $scope.$eval($attrs[key], { ref: ref });
        };
      });

      $scope.$on('$destroy', function () {
        _reactDom2.default.unmountComponentAtNode(elem);
      });

      render();
    };
  };
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

/***/ })
/******/ ]);
});