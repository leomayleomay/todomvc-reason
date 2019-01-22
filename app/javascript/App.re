open Belt;

module Top = {
  type action =
    | NoUpdate
    | ChangeTodo(string)
    | LoadTodoItems
    | MarkLoadTodoItemsAsSuccessful(array(TodoItem.t))
    | MarkLoadTodoItemsAsFailed(string)
    | CreateTodoItem
    | MarkCreateTodoItemAsSuccessful(array(TodoItem.t))
    | MarkCreateTodoItemAsFailed(string)
    | Navigate(Footer.showingState);
  type state = {
    nowShowing: Footer.showingState,
    newTodo: string,
    todoItems: RemoteData.t(list(TodoItem.t), unit, string),
  };
  let urlToShownPage = hash =>
    switch (hash) {
    | "active" => Footer.ActiveTodos
    | "completed" => CompletedTodos
    | _ => AllTodos
    };
  let component = ReasonReact.reducerComponent("TodoAppRe");
  let make = _children => {
    ...component,
    reducer: (action, state) =>
      switch (action) {
      | NoUpdate => ReasonReact.NoUpdate
      | ChangeTodo(newTodo) => ReasonReact.Update({...state, newTodo})
      | LoadTodoItems =>
        UpdateWithSideEffects(
          {...state, todoItems: Loading()},
          (
            ({send}) =>
              Js.Promise.(
                TodoItem.fetchAll()
                |> then_(items =>
                     send(MarkLoadTodoItemsAsSuccessful(items)) |> resolve
                   )
                |> catch(error =>
                     send(MarkLoadTodoItemsAsFailed(error |> Js.String.make))
                     |> resolve
                   )
                |> ignore
              )
          ),
        )
      | MarkLoadTodoItemsAsSuccessful(items) =>
        Update({...state, todoItems: Success(List.fromArray(items))})
      | MarkLoadTodoItemsAsFailed(error) =>
        Update({...state, todoItems: Failure(error)})
      | Navigate(page) => ReasonReact.Update({...state, nowShowing: page})
      | CreateTodoItem =>
        switch (String.trim(state.newTodo)) {
        | "" => ReasonReact.NoUpdate
        | nonEmptyValue =>
          ReasonReact.UpdateWithSideEffects(
            {...state, todoItems: Loading()},
            (
              ({send}) =>
                Js.Promise.(
                  TodoItem.create(~title=nonEmptyValue)
                  |> then_(items =>
                       send(MarkCreateTodoItemAsSuccessful(items)) |> resolve
                     )
                  |> ignore
                )
            ),
          )
        }
      | MarkCreateTodoItemAsSuccessful(items) =>
        Update({...state, todoItems: Success(List.fromArray(items))})
      | MarkCreateTodoItemAsFailed(error) =>
        Update({...state, todoItems: Failure(error)})
      },
    initialState: () => {
      nowShowing:
        urlToShownPage(ReasonReact.Router.dangerouslyGetInitialUrl().hash),
      newTodo: "",
      todoItems: NotAsked,
    },
    didMount: self => {
      let token =
        ReasonReact.Router.watchUrl(url =>
          self.send(Navigate(urlToShownPage(url.hash)))
        );
      self.onUnmount(() => ReasonReact.Router.unwatchUrl(token));
      self.send(LoadTodoItems);
    },
    /* router actions */
    render: ({state, send}) =>
      switch (state.todoItems) {
      | NotAsked => <div />
      | Loading () => <h1> (ReasonReact.string("Loading...")) </h1>
      | Failure(error) => <h1> (ReasonReact.string(error)) </h1>
      | Success(todoItems) =>
        let todoItemsToShow =
          List.keep(todoItems, todoItem =>
            TodoItem.(
              switch (state.nowShowing) {
              | ActiveTodos => ! todoItem.completed
              | CompletedTodos => todoItem.completed
              | AllTodos => true
              }
            )
          )
          |> List.map(_, todoItem => <TodoItem key=todoItem.title todoItem />);
        let todosLength = List.length(todoItems);
        let completedCount =
          List.keep(todoItems, todoItem => TodoItem.(todoItem.completed))
          |> List.length;
        let activeTodoCount = todosLength - completedCount;
        let footer =
          switch (activeTodoCount, completedCount) {
          | (0, 0) => ReasonReact.null
          | _ => <Footer count=activeTodoCount />
          };
        let main =
          todosLength === 0 ?
            ReasonReact.null :
            <section className="main">
              <ul className="todo-list">
                (ReasonReact.array(List.toArray(todoItemsToShow)))
              </ul>
            </section>;
        <div>
          <header className="header">
            <h1> (ReasonReact.string("Todo App")) </h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value=state.newTodo
              size=100
              onKeyDown=(
                event =>
                  if (ReactEvent.Keyboard.keyCode(event) === 13) {
                    ReactEvent.Keyboard.preventDefault(event);
                    send(CreateTodoItem);
                  } else {
                    send(NoUpdate);
                  }
              )
              onChange=(
                event =>
                  send(ChangeTodo(ReactEvent.Form.target(event)##value))
              )
              autoFocus=true
            />
          </header>
          main
          footer
        </div>;
      },
  };
};

let embed = target => ReactDOMRe.render(<Top />, target);