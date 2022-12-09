import "./styles.css";
import React, { useState } from "react";

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
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompletetodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
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
