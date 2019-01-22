'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var ReactDom = require("react-dom");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Footer$ReasonReactTodomvc = require("./Footer.bs.js");
var TodoItem$ReasonReactTodomvc = require("./TodoItem.bs.js");

function urlToShownPage(hash) {
  switch (hash) {
    case "active" : 
        return /* ActiveTodos */1;
    case "completed" : 
        return /* CompletedTodos */2;
    default:
      return /* AllTodos */0;
  }
}

var component = ReasonReact.reducerComponent("TodoAppRe");

function make(_children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (self) {
              var token = ReasonReact.Router[/* watchUrl */1]((function (url) {
                      return Curry._1(self[/* send */3], /* Navigate */Block.__(5, [urlToShownPage(url[/* hash */1])]));
                    }));
              Curry._1(self[/* onUnmount */4], (function (param) {
                      return ReasonReact.Router[/* unwatchUrl */2](token);
                    }));
              return Curry._1(self[/* send */3], /* LoadTodoItems */1);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              var send = param[/* send */3];
              var state = param[/* state */1];
              var match = state[/* todoItems */2];
              if (typeof match === "number") {
                return React.createElement("div", undefined);
              } else {
                switch (match.tag | 0) {
                  case 0 : 
                      return React.createElement("h1", undefined, "Loading...");
                  case 1 : 
                      return React.createElement("h1", undefined, match[0]);
                  case 2 : 
                      var todoItems = match[0];
                      var __x = Belt_List.keep(todoItems, (function (todoItem) {
                              var match = state[/* nowShowing */0];
                              switch (match) {
                                case 0 : 
                                    return true;
                                case 1 : 
                                    return !todoItem[/* completed */1];
                                case 2 : 
                                    return todoItem[/* completed */1];
                                
                              }
                            }));
                      var todoItemsToShow = Belt_List.map(__x, (function (todoItem) {
                              return ReasonReact.element(todoItem[/* title */0], undefined, TodoItem$ReasonReactTodomvc.make(todoItem, /* array */[]));
                            }));
                      var todosLength = Belt_List.length(todoItems);
                      var completedCount = Belt_List.length(Belt_List.keep(todoItems, (function (todoItem) {
                                  return todoItem[/* completed */1];
                                })));
                      var activeTodoCount = todosLength - completedCount | 0;
                      var footer = activeTodoCount !== 0 ? ReasonReact.element(undefined, undefined, Footer$ReasonReactTodomvc.make(activeTodoCount, /* array */[])) : (
                          completedCount !== 0 ? ReasonReact.element(undefined, undefined, Footer$ReasonReactTodomvc.make(activeTodoCount, /* array */[])) : null
                        );
                      var match$1 = todosLength === 0;
                      var main = match$1 ? null : React.createElement("section", {
                              className: "main"
                            }, React.createElement("ul", {
                                  className: "todo-list"
                                }, Belt_List.toArray(todoItemsToShow)));
                      return React.createElement("div", undefined, React.createElement("header", {
                                      className: "header"
                                    }, React.createElement("h1", undefined, "Todo App"), React.createElement("input", {
                                          className: "new-todo",
                                          autoFocus: true,
                                          placeholder: "What needs to be done?",
                                          size: 100,
                                          value: state[/* newTodo */1],
                                          onKeyDown: (function ($$event) {
                                              if ($$event.keyCode === 13) {
                                                $$event.preventDefault();
                                                return Curry._1(send, /* CreateTodoItem */2);
                                              } else {
                                                return Curry._1(send, /* NoUpdate */0);
                                              }
                                            }),
                                          onChange: (function ($$event) {
                                              return Curry._1(send, /* ChangeTodo */Block.__(0, [$$event.target.value]));
                                            })
                                        })), main, footer);
                  
                }
              }
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* nowShowing */urlToShownPage(ReasonReact.Router[/* dangerouslyGetInitialUrl */3](/* () */0)[/* hash */1]),
                      /* newTodo */"",
                      /* todoItems : NotAsked */0
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              var exit = 0;
              if (typeof action === "number") {
                switch (action) {
                  case 0 : 
                      return /* NoUpdate */0;
                  case 1 : 
                      return /* UpdateWithSideEffects */Block.__(2, [
                                /* record */[
                                  /* nowShowing */state[/* nowShowing */0],
                                  /* newTodo */state[/* newTodo */1],
                                  /* todoItems : Loading */Block.__(0, [/* () */0])
                                ],
                                (function (param) {
                                    var send = param[/* send */3];
                                    TodoItem$ReasonReactTodomvc.fetchAll(/* () */0).then((function (items) {
                                              return Promise.resolve(Curry._1(send, /* MarkLoadTodoItemsAsSuccessful */Block.__(1, [items])));
                                            })).catch((function (error) {
                                            return Promise.resolve(Curry._1(send, /* MarkLoadTodoItemsAsFailed */Block.__(2, [String(error)])));
                                          }));
                                    return /* () */0;
                                  })
                              ]);
                  case 2 : 
                      var nonEmptyValue = $$String.trim(state[/* newTodo */1]);
                      if (nonEmptyValue === "") {
                        return /* NoUpdate */0;
                      } else {
                        return /* UpdateWithSideEffects */Block.__(2, [
                                  /* record */[
                                    /* nowShowing */state[/* nowShowing */0],
                                    /* newTodo */state[/* newTodo */1],
                                    /* todoItems : Loading */Block.__(0, [/* () */0])
                                  ],
                                  (function (param) {
                                      var send = param[/* send */3];
                                      TodoItem$ReasonReactTodomvc.create(nonEmptyValue).then((function (items) {
                                              return Promise.resolve(Curry._1(send, /* MarkCreateTodoItemAsSuccessful */Block.__(3, [items])));
                                            }));
                                      return /* () */0;
                                    })
                                ]);
                      }
                  
                }
              } else {
                switch (action.tag | 0) {
                  case 0 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* nowShowing */state[/* nowShowing */0],
                                  /* newTodo */action[0],
                                  /* todoItems */state[/* todoItems */2]
                                ]]);
                  case 1 : 
                  case 3 : 
                      exit = 1;
                      break;
                  case 2 : 
                  case 4 : 
                      exit = 2;
                      break;
                  case 5 : 
                      return /* Update */Block.__(0, [/* record */[
                                  /* nowShowing */action[0],
                                  /* newTodo */state[/* newTodo */1],
                                  /* todoItems */state[/* todoItems */2]
                                ]]);
                  
                }
              }
              switch (exit) {
                case 1 : 
                    return /* Update */Block.__(0, [/* record */[
                                /* nowShowing */state[/* nowShowing */0],
                                /* newTodo */state[/* newTodo */1],
                                /* todoItems : Success */Block.__(2, [Belt_List.fromArray(action[0])])
                              ]]);
                case 2 : 
                    return /* Update */Block.__(0, [/* record */[
                                /* nowShowing */state[/* nowShowing */0],
                                /* newTodo */state[/* newTodo */1],
                                /* todoItems : Failure */Block.__(1, [action[0]])
                              ]]);
                
              }
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

var Top = /* module */[
  /* urlToShownPage */urlToShownPage,
  /* component */component,
  /* make */make
];

function embed(target) {
  ReactDom.render(ReasonReact.element(undefined, undefined, make(/* array */[])), target);
  return /* () */0;
}

exports.Top = Top;
exports.embed = embed;
/* component Not a pure module */
