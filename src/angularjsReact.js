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

const INPUT_PREFIX = 'reIn';
const INPUT_PREFIX_REGEXP = new RegExp(`^${INPUT_PREFIX}[A-Z]`);
const INPUT_ATTR_PREFIX = 're-in-';
const INPUT_ATTR_PREFIX_REGEXP = new RegExp(`^${INPUT_ATTR_PREFIX}`);
const CALLBACK_PREFIX = 'reCb';
const CALLBACK_PREFIX_REGEXP = new RegExp(`^${CALLBACK_PREFIX}[A-Z]`);
const REF_ATTR = 'reRef';
const REF_ATTR_REGEXP = new RegExp(`^${REF_ATTR}$`);

const _ = (target) => {
  let accumulator = target;
  const api = {
    keyBy: (fn) => {
      const result = {};
      accumulator.forEach((value, i) => {
        result[fn(value, i)] = value;
      });
      accumulator = result;
      return api;
    },
    isNil: () => typeof accumulator === 'undefined' || accumulator === null,
    value: () => accumulator,
  };
  return api;
};

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
    const instance = {};
    instance.hasChildren = this.acceptsChildren && !!element.html().trim();
    if (instance.hasChildren) {
      instance.innerHtml = element.html();
      instance.contents = element.contents();
      instance.contents.splice(0).forEach((e) => {
        angular.element(e).detach();
      });
    }
    return this.link(instance);
  };

  link = (instance) => ($scope, $elem, $attrs) => {
    const replace = $attrs.reReplace || $attrs.reReplace === "";
    const elem = $elem[0];
    const index = elem.parentNode && [...elem.parentNode.childNodes].indexOf(elem);
    const reactParent = replace ? elem.cloneNode(false) : elem;

    let angularParent;
    if (instance.hasChildren) {
      let content;
      try {
        content = this.$compile(instance.innerHtml)($scope);
      } catch(e) {
        content = instance.contents;
      }
      angularParent = angular.element(elem.cloneNode(false));
      angularParent.append(content);
    }

    const props = {};
    let refCallbacks;
    let renderPending = false;

    const transclude = (ref, content) => {
      if (renderPending) {
        /* eslint-disable react/no-find-dom-node */
        const node = ReactDOM.findDOMNode(ref);
        /* eslint-disable no-undef */
        angular.element(node).replaceWith(content);
      }
    };

    const getChildren = (parent) => {
      if ([].slice.call(parent[0].attributes || []).filter(a => a.name === 're-react').length) {
        const result = parent.contents().splice(0)
          .filter(e => e.tagName)
          .map(e => {
          const el = angular.element(e);
          const inputAttrs = [].slice.call(e.attributes || [])
            .filter(a => a.name.match(INPUT_ATTR_PREFIX_REGEXP));
          const inputProps = _(inputAttrs)
            .keyBy(a => a.name.substr(INPUT_ATTR_PREFIX.length, 1).toLowerCase()
              + a.name.substr(INPUT_ATTR_PREFIX.length + 1)).value();
          Object.keys(inputProps)
            .forEach(prop => { inputProps[prop] = el.scope().$eval(inputProps[prop].value); });
          return React.createElement(e.tagName, inputProps, getChildren(el));
        });
        if (result.length > 0) {
          return result.length > 1 ? result : result[0];
        }
      }
      return React.createElement('outlet', { ref: ref => transclude(ref, parent.contents()) });
    };

    const render = () => {
      if (!renderPending) {
        this.$timeout(() => {
          const component = this.component(props);
          const children = instance.hasChildren ? getChildren(angularParent) : undefined;
          ReactDOM.render(React.createElement(
            component.type,
            angular.extend({},
              { ...component.props },
              { ref: ref => {
                if (replace) {
                  angular.element(elem.parentNode.childNodes[index]).replaceWith(angular.element(reactParent).contents());
                }
                refCallbacks.forEach(cb => cb(ref));
              } }),
            children), reactParent);
          renderPending = false;
        });
        renderPending = true;
      }
    };

    const inputAttrs = Object.keys($attrs).filter((key) => key.match(INPUT_PREFIX_REGEXP));
    const inputProps = inputAttrs.map((key) => key.substr(INPUT_PREFIX.length, 1).toLowerCase()
      + key.substr(INPUT_PREFIX.length + 1));
    inputAttrs.forEach((key, i) => {
      $scope.$watch($attrs[key], (value) => {
        props[inputProps[i]] = value;
        render();
      }, true);
      $scope.$watch($attrs[key], (value) => {
        props[inputProps[i]] = value;
        render();
      });
    });

    const callbackAttrs = Object.keys($attrs).filter((key) => key.match(CALLBACK_PREFIX_REGEXP));
    const callbackProps = callbackAttrs
      .map((key) => key.substr(CALLBACK_PREFIX.length, 1).toLowerCase()
        + key.substr(CALLBACK_PREFIX.length + 1));
    callbackAttrs.forEach((key, i) => {
      props[callbackProps[i]] = (...args) => {
        this.$timeout(() => $scope.$eval($attrs[key], { args }));
      };
    });

    refCallbacks = Object.keys($attrs).filter((key) => key.match(REF_ATTR_REGEXP))
      .map((key) => (ref) => $scope.$eval($attrs[key], { ref }));

    $scope.$on('$destroy', () => {
      ReactDOM.unmountComponentAtNode(reactParent);
    });

    render();
  };

}

export default (component) => {
  const factory = ($compile, $timeout) => new AngularjsReact(component, $compile, $timeout);
  factory.$inject = ['$compile', '$timeout'];
  return factory;
};
