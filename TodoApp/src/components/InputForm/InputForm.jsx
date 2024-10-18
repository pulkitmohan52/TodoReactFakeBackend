import React, { useRef, useState, useEffect } from "react";
import "./InputForm.css";
import TodoItemView from "../TodoItemView/TodoItemView";

const InputForm = () => {
  const inputRef = useRef(null);
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`http://localhost:8000/todos`);
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log("Error fetching data");
      }
    };
    fetchTodos();
  }, []);

  const deleteTodo = async (index, id) => {
    if (confirm(`do you want to delete the todo item ${todos[index].title}`)) {
      try {
        await fetch(`/api/${id}`, {
          method: "DELETE",
        });
        setTodos(todos.filter((todo, i) => i !== index));
      } catch (error) {
        console.log(`error deleting todo: ${error}`);
      }
    }
  };

  const addTodo = async () => {
    const newTodo = { title: inputRef.current.value, completed: false };
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const data = await res.json();
      setTodos([...todos, data]);
      inputRef.current.value = ""; //clear the input
    } catch (error) {
      console.log("error occured");
    }
  };

  const saveEditedTodo = async (index, id) => {
    const editedTodo = { ...todos[index], title: editValue };
    console.log(`edited todo is : ${JSON.stringify(editedTodo)}`);
    try {
      const res = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTodo),
      });

      const data = await res.json();
      setTodos(todos.map((todo, i) => (i === index ? data : todo)));
      setEditingIndex(null);
      setEditValue("");
    } catch (error) {
      console.log(`error occured while uploading data to the server: ${error}`);
    }
  };

  return (
    <>
      <div className="container">
        <h1>get it going</h1>
        <div className="input-group">
          <input
            id="todo-input"
            type="string"
            placeholder="enter something here"
            className="todo-input"
            ref={inputRef}
          />
          <button className="todo-submit-btn" onClick={addTodo}>
            click here to add todo
          </button>
          <button className="todo-search-btn">search todos</button>
        </div>
        {/* Pass todos to TodoItemView */}
        <TodoItemView
          todos={todos}
          deleteTodo={deleteTodo}
          saveEditedTodo={saveEditedTodo}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          editValue={editValue}
          setEditValue={setEditValue}
        />
      </div>
    </>
  );
};

export default InputForm;
