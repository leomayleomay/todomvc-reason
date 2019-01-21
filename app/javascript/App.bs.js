'use strict';

var ReactDom = require("react-dom");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Greeting$ReasonReactTodomvc = require("./Greeting.bs.js");

function embed(target) {
  ReactDom.render(ReasonReact.element(undefined, undefined, Greeting$ReasonReactTodomvc.make("Reason", /* array */[])), target);
  return /* () */0;
}

exports.embed = embed;
/* react-dom Not a pure module */
