import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  //  functions
  useEffect(() => {
    const filteredHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filteredHandler();
    saveLocalTodos();
  }, [status, todos]);

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        status={status}
      />
      <TodoList setTodos={setTodos} todos={filteredTodos} status={status} />
    </div>
  );
}

export default App;
