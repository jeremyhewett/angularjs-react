/**
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

import React from 'react';
import ReactDOM from 'react-dom';
import angular from 'angular';

import { _, toCamelCase } from "./utility";

const INPUT_PREFIX = 'reIn';
const INPUT_PREFIX_REGEXP = new RegExp(`^${INPUT_PREFIX}[A-Z]`);
const INPUT_ATTR_PREFIX = 're-in-';
const INPUT_ATTR_PREFIX_REGEXP = new RegExp(`^${INPUT_ATTR_PREFIX}`);
const IINPUT_PREFIX = 'reIin';
const IINPUT_PREFIX_REGEXP = new RegExp(`^${IINPUT_PREFIX}[A-Z]`);
const IINPUT_ATTR_PREFIX = 're-iin-';
const IINPUT_ATTR_PREFIX_REGEXP = new RegExp(`^${IINPUT_ATTR_PREFIX}`);
const CALLBACK_PREFIX = 'reCb';
const CALLBACK_PREFIX_REGEXP = new RegExp(`^${CALLBACK_PREFIX}[A-Z]`);
const REF_ATTR = 'reRef';
const REF_ATTR_REGEXP = new RegExp(`^${REF_ATTR}$`);

class AngularjsReact {

  constructor(component, $compile, $timeout) {
    this.acceptsChildren = !component.propTypes || !!component.propTypes.children;
    this.component = React.createFactory(component);
    this.$compile = $compile;
    this.$timeout = $timeout;
  }

  restrict = 'E';
  scope = true;

  compile = (element) => {
    const markup = {};
    markup.hasChildren = this.acceptsChildren && !!element.html().trim();
    if (markup.hasChildren) {
      markup.innerHtml = element.html();
      markup.contents = element.contents();
      markup.contents.splice(0).forEach((e) => {
        angular.element(e).detach();
      });
    }
    return this.getLinker(markup);
  };

  getLinker = (markup) => ($scope, $elem, $attrs) => {
    let instance = new Instance(this, markup);
    instance.link($scope, $elem, $attrs);
  }

}

class Instance {

  constructor(Directive, markup) {
    this.component = Directive.component;
    this.$compile = Directive.$compile;
    this.$timeout = Directive.$timeout;
    this.markup = markup;
    this.renderPending = false;
    this.props = {};
  }

  link = ($scope, $elem, $attrs) => {
    this.$scope = $scope;
    this.elem = $elem[0];
    this.$attrs = $attrs;

    this.replace = this.$attrs.reReplace || this.$attrs.reReplace === "";
    this.nodeIndex = this.elem.parentNode && [...this.elem.parentNode.childNodes].indexOf(this.elem);
    this.reactParent = this.replace ? this.elem.cloneNode(false) : this.elem;

    if (this.markup.hasChildren) {
      let content;
      try {
        content = this.$compile(this.markup.innerHtml)(this.$scope);
      } catch(e) {
        content = this.markup.contents;
      }
      this.angularParent = angular.element(this.elem.cloneNode(false));
      this.angularParent.append(content);
    }

    this.setupInputs();
    this.setupCallbacks();
    this.setupRefCallbacks();

    this.$scope.$on('$destroy', () => {
      ReactDOM.unmountComponentAtNode(this.reactParent);
    });

    this.scheduleRender();
  };

  transclude = (ref, content) => {
    if (this.renderPending) {
      const node = ReactDOM.findDOMNode(ref);
      angular.element(node).replaceWith(content);
    }
  };

  getChildren = (parent) => {
    if ([].slice.call(parent[0].attributes || []).filter(a => a.name === 're-react').length) {
      const result = parent.contents().splice(0)
        .filter(e => e.tagName)
        .map(e => {
          const $elem = angular.element(e);
          let inputAttrs = [].slice.call(e.attributes || [])
            .filter(a => a.name.match(INPUT_ATTR_PREFIX_REGEXP));
          let inputProps = _(inputAttrs)
            .keyBy(a => a.name.substr(INPUT_ATTR_PREFIX.length, 1).toLowerCase()
              + toCamelCase(a.name.substr(INPUT_ATTR_PREFIX.length + 1))).value();
          Object.keys(inputProps)
            .forEach(prop => { inputProps[prop] = $elem.scope().$eval(inputProps[prop].value); });
          return React.createElement(e.tagName, inputProps, this.getChildren($elem));
        });
      if (result.length > 0) {
        return result.length > 1 ? result : result[0];
      }
    }
    return React.createElement('outlet', { ref: ref => this.transclude(ref, parent.contents()) });
  };

  render = () => {
    const component = this.component(this.props);
    const children = this.markup.hasChildren ? this.getChildren(this.angularParent) : undefined;
    ReactDOM.render(React.createElement(
      component.type,
      angular.extend({},
        { ...component.props },
        { ref: ref => {
          if (this.replace) {
            angular.element(this.elem.parentNode.childNodes[this.nodeIndex]).replaceWith(angular.element(this.reactParent).contents());
          }
          this.refCallbacks.forEach(cb => cb(ref));
        } }),
      children), this.reactParent);
    this.renderPending = false;
  };

  scheduleRender = () => {
    if (!this.renderPending) {
      this.$timeout(this.render);
      this.renderPending = true;
    }
  };

  setupInputs = () => {
    let inputAttrs = Object.keys(this.$attrs).filter((key) => key.match(INPUT_PREFIX_REGEXP));
    let inputProps = inputAttrs.map((key) => key.substr(INPUT_PREFIX.length, 1).toLowerCase()
      + key.substr(INPUT_PREFIX.length + 1));
    inputAttrs.forEach((key, i) => {
      this.$scope.$watch(this.$attrs[key], (value) => {
        this.props[inputProps[i]] = value;
        this.scheduleRender();
      }, true);
      this.$scope.$watch(this.$attrs[key], (value) => {
        this.props[inputProps[i]] = value;
        this.scheduleRender();
      });
    });

    //Immutable inputs
    let iinputAttrs = Object.keys(this.$attrs).filter((key) => key.match(IINPUT_PREFIX_REGEXP));
    let iinputProps = iinputAttrs.map((key) => key.substr(IINPUT_PREFIX.length, 1).toLowerCase()
      + key.substr(IINPUT_PREFIX.length + 1));
    iinputAttrs.forEach((key, i) => {
      this.$scope.$watch(this.$attrs[key], (value) => {
        this.props[iinputProps[i]] = value;
        this.scheduleRender();
      });
    });
  };

  setupCallbacks = () => {
    let callbackAttrs = Object.keys(this.$attrs).filter((key) => key.match(CALLBACK_PREFIX_REGEXP));
    let callbackProps = callbackAttrs
      .map((key) => key.substr(CALLBACK_PREFIX.length, 1).toLowerCase()
        + key.substr(CALLBACK_PREFIX.length + 1));
    callbackAttrs.forEach((key, i) => {
      this.props[callbackProps[i]] = (...args) => {
        this.$timeout(() => this.$scope.$eval(this.$attrs[key], { arg: args[0], args }));
      };
    });
  };

  setupRefCallbacks = () => {
    this.refCallbacks = Object.keys(this.$attrs).filter((key) => key.match(REF_ATTR_REGEXP))
      .map((key) => (ref) => this.$scope.$eval(this.$attrs[key], { ref }));
  };

}

export default (component) => {
  const factory = ($compile, $timeout) => new AngularjsReact(component, $compile, $timeout);
  factory.$inject = ['$compile', '$timeout'];
  return factory;
};
