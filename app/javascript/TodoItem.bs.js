'use strict';

var Fetch = require("bs-fetch/src/Fetch.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var baseUrl = "http://localhost:3001";

function parseOne(json) {
  return /* record */[
          /* title */Json_decode.field("title", Json_decode.string, json),
          /* completed */Json_decode.field("completed", Json_decode.bool, json)
        ];
}

function parseAll(json) {
  return Json_decode.array(parseOne, json);
}

function fetchAll(param) {
  return fetch("http://localhost:3001/todo_items.json").then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                return Promise.resolve(Json_decode.array(parseOne, json));
              }));
}

function create(title) {
  var body = Json_encode.object_(/* :: */[
        /* tuple */[
          "todo_item",
          Json_encode.object_(/* :: */[
                /* tuple */[
                  "title",
                  title
                ],
                /* [] */0
              ])
        ],
        /* [] */0
      ]);
  var request = Fetch.RequestInit[/* make */0](/* Post */2, {
          "Content-Type": "application/json"
        }, Caml_option.some(JSON.stringify(body)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(/* () */0);
  return fetch("http://localhost:3001/todo_items", request).then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                return Promise.resolve(Json_decode.array(parseOne, json));
              }));
}

var component = ReasonReact.statelessComponent("TodoItem");

function make(todoItem, _children) {
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
              var match = todoItem[/* completed */1];
              var className = $$String.concat(" ", /* :: */[
                    match ? "completed" : "",
                    /* [] */0
                  ]);
              return React.createElement("li", {
                          className: className
                        }, React.createElement("div", {
                              className: "view"
                            }, React.createElement("input", {
                                  className: "toggle",
                                  checked: todoItem[/* completed */1],
                                  type: "checkbox"
                                }), React.createElement("label", undefined, todoItem[/* title */0])));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.baseUrl = baseUrl;
exports.parseOne = parseOne;
exports.parseAll = parseAll;
exports.fetchAll = fetchAll;
exports.create = create;
exports.component = component;
exports.make = make;
/* component Not a pure module */
