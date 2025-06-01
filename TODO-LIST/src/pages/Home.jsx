import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Todo from '../components/Todo';

const getTodos = () => {
  let todos = localStorage.getItem('todos');
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
};

const Home = () => {
  const [todos, setTodos] = useState(getTodos());
  const [todo, setTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (todo && todos.findIndex(t => t.text === todo) === -1) {
      setTodos(prev => [...prev, { id: nanoid(), text: todo }]);
      setTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const moveUp = (id) => {
    let index = todos.findIndex(t => t.id === id);
    if (index > 0) {
      let temp = todos[index];
      todos[index] = todos[index - 1];
      todos[index - 1] = temp;
      setTodos([...todos]);
    }
  };

  const moveDown = (id) => {
    let index = todos.findIndex(t => t.id === id);
    if (index < todos.length - 1) {
      let temp = todos[index];
      todos[index] = todos[index + 1];
      todos[index + 1] = temp;
      setTodos([...todos]);
    }
  };

  const updateTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='home'>
      <div className='container'>
        <form className='todo-form' onSubmit={addTodo}>
          <input
            type="text"
            placeholder='Add item...'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type='button'
            onClick={addTodo}
            className='btn-addTodo'
            value='Add'
            disabled={todo.trim() === ''}
            style={{ cursor: todo.trim() === '' ? 'not-allowed' : 'pointer' }}
          />
        </form>

        {todos.length ? (
          <div className='todo-list'>
            {todos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                moveUp={moveUp}
                moveDown={moveDown}
                updateTodo={updateTodo} // 👈 Ajout pour l'édition
                total={todos.length}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
            No todo...
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
