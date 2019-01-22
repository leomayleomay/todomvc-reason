type showingState =
  | AllTodos
  | ActiveTodos
  | CompletedTodos;

let component = ReasonReact.statelessComponent("Footer");

let push = (path, event) => {
  ReactEvent.Mouse.preventDefault(event);
  ReasonReact.Router.push("#" ++ path);
};

let make = (~count, _children) => {
  ...component,
  render: _self => {
    let activeTodoWord = count === 1 ? "item" : "items";
    <footer>
      <span>
        <strong> {ReasonReact.string(string_of_int(count))} </strong>
        {ReasonReact.string(" " ++ activeTodoWord ++ " left")}
      </span>
      <ul>
        <li> <a onClick={push("")}> {ReasonReact.string("All")} </a> </li>
        {ReasonReact.string(" ")}
        <li>
          <a onClick={push("active")}> {ReasonReact.string("Active")} </a>
        </li>
        {ReasonReact.string(" ")}
        <li>
          <a onClick={push("completed")}>
            {ReasonReact.string("Completed")}
          </a>
        </li>
      </ul>
    </footer>;
  },
};