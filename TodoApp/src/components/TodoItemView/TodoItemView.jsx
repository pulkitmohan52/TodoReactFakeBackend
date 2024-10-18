import { useState } from "react";
import "./TodoItemView.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const TodoItemView = ({
  todos,
  deleteTodo,
  saveEditedTodo,
  editingIndex,
  setEditingIndex,
  editValue,
  setEditValue,
}) => {
  return (
    <>
      <h1>this is </h1>
      <ul>
        {todos.map((item, index) => {
          return (
            <li key={item.id}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => saveEditedTodo(index, item.id)}>
                    Save todo
                  </button>
                  <button onClick={() => setEditingIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {item.title}
                  <FaEdit
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      setEditingIndex(index);
                      setEditValue(item.title);
                    }}
                  />
                  <FaTrashAlt
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteTodo(index, item.id)}
                  />
                  <input
                    id="todo-complete"
                    type="checkbox"
                    style={{ marginLeft: "10px" }}
                    checked={item.completed}
                    onChange={() => {
                      /* Update completion status */
                    }}
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoItemView;
