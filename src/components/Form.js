import React, { useState, Fragment } from "react";
import ErrorModal from "../UI/ErrorModal";

const Form = ({ setStatus, inputText, setInputText, todos, setTodos }) => {
  const [error, setError] = useState();
  const inputTextHandler = (event) => {
    setInputText(event.target.value);
  };
  ///// ....................................
  const errorHandler = () => {
    setError(null);
  };

  //// ........................

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputText.trim().length === 0) {
      setError({
        title: "Invalid Task Added",
        message: "Please Enter a Valid Task ",
      });
      setInputText("");
      return;
    }

    if (inputText.trim().length > 30) {
      setError({
        title: "Add Shorter Task ",
        message: "Please Enter a Smaller Task Which is Easy To Achieved",
      });
      console.log(inputText.trim().length);
      setInputText("");
      return;
    }
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 },
    ]);
    console.log(inputText.trim().length);
    setInputText("");
  };
  ////////////.................

  const statusHandler = (event) => {
    setStatus(event.target.value);
  };
  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form>
        <input
          value={inputText}
          type="text"
          className="todo-input"
          onChange={inputTextHandler}
        />
        <button onClick={submitHandler} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select name="todos" onClick={statusHandler} className="filter-todo">
            <option selected value="all">
              All
            </option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </Fragment>
  );
};
export default Form;
