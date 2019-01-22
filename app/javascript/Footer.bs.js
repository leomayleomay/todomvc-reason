'use strict';

var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("Footer");

function push(path, $$event) {
  $$event.preventDefault();
  return ReasonReact.Router[/* push */0]("#" + path);
}

function make(count, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (_self) {
              var match = count === 1;
              var activeTodoWord = match ? "item" : "items";
              return React.createElement("footer", undefined, React.createElement("span", undefined, React.createElement("strong", undefined, String(count)), " " + (activeTodoWord + " left")), React.createElement("ul", undefined, React.createElement("li", undefined, React.createElement("a", {
                                      onClick: (function (param) {
                                          return push("", param);
                                        })
                                    }, "All")), " ", React.createElement("li", undefined, React.createElement("a", {
                                      onClick: (function (param) {
                                          return push("active", param);
                                        })
                                    }, "Active")), " ", React.createElement("li", undefined, React.createElement("a", {
                                      onClick: (function (param) {
                                          return push("completed", param);
                                        })
                                    }, "Completed"))));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.component = component;
exports.push = push;
exports.make = make;
/* component Not a pure module */
