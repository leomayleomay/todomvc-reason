type t = {
  title: string,
  completed: bool,
};

let baseUrl = "http://localhost:3001";

let parseOne = (json: Js.Json.t) : t => {
  title: Json.Decode.(json |> field("title", string)),
  completed: Json.Decode.(json |> field("completed", bool)),
};

let parseAll = json => Json.Decode.(json |> array(parseOne));

let fetchAll = () : Js.Promise.t(array(t)) =>
  Js.Promise.(
    Fetch.fetch(baseUrl ++ "/todo_items.json")
    |> then_(Fetch.Response.json)
    |> then_(json => json |> parseAll |> resolve)
  );

let create = (~title: string) : Js.Promise.t(array(t)) => {
  let body =
    Json.Encode.(
      object_([("todo_item", object_([("title", string(title))]))])
    );
  let request =
    Fetch.(
      RequestInit.make(
        ~method_=Post,
        ~body=BodyInit.make(Js.Json.stringify(body)),
        ~headers=Fetch.HeadersInit.make({"Content-Type": "application/json"}),
        (),
      )
    );
  Js.Promise.(
    Fetch.fetchWithInit(baseUrl ++ "/todo_items", request)
    |> then_(Fetch.Response.json)
    |> then_(json => json |> parseAll |> resolve)
  );
};

let component = ReasonReact.statelessComponent("TodoItem");

let make = (~todoItem: t, _children) => {
  ...component,
  render: _self => {
    let className =
      [todoItem.completed ? "completed" : ""] |> String.concat(" ");
    <li className>
      <div className="view">
        <input
          className="toggle"
          type_="checkbox"
          checked=todoItem.completed
        />
        <label> (ReasonReact.string(todoItem.title)) </label>
      </div>
    </li>;
  },
};