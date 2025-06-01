import React, { useState } from 'react';

const Todo = ({ todo, deleteTodo, moveUp, moveDown, updateTodo, total, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleUpdate = (id) => {
    if (editedText.trim() !== '') {
      updateTodo(id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdate(todo.id);
            }
          }}
          className="input-edit"
        />
      ) : (
        <p className="text">{todo.text}</p>
      )}

      <div className="utils">
        <button
          onClick={() => {
            setIsEditing(true);
            setEditedText(todo.text);
          }}
          className="btn-edit"
        >
          ✏️
        </button>

        <div
          className="go-up"
          style={{ borderBottomColor: index === 0 ? 'grey' : '#1DA1F2' }}
          onClick={() => moveUp(todo.id)}
        ></div>

        <div
          className="go-down"
          style={{ borderTopColor: index === total - 1 ? 'grey' : '#1DA1F2' }}
          onClick={() => moveDown(todo.id)}
        ></div>

        <div className="remove" onClick={() => deleteTodo(todo.id)}></div>
      </div>
    </div>
  );
};

export default Todo;
