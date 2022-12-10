import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";

export const App = () => {
  const [todoText, settodoText] = useState("");
  const [incompletetodos, setincompletetodos] = useState([]);
  const [completetodos, setcompletetodos] = useState([]);

  const onChangeTodoText = (event) => settodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompletetodos, todoText];
    setincompletetodos(newTodos);
    settodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompletetodos];
    newTodos.splice(index, 1);
    setincompletetodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newInCompleteTodos = [...incompletetodos];
    newInCompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completetodos, incompletetodos[index]];
    setincompletetodos(newInCompleteTodos);
    setcompletetodos(newCompleteTodos);
  };
  const onClickBack = (index) => {
    const newCompleteTodos = [...completetodos];
    newCompleteTodos.splice(index, 1);

    const newInCompleteTodos = [...incompletetodos, completetodos[index]];
    setcompletetodos(newCompleteTodos);
    setincompletetodos(newInCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todo={incompletetodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completetodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
