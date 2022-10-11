import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from './MyContext';
import { addTask } from '../redux/reducers/tasks';

export default function AddTodoForm({ todo, setTodo, dispatch }) {
  const [data, setData] = useContext(DataContext);
  function handleAddInputChange(e) {
    setTodo(e.target.value);
  }
  function handleAddFormSubmit(e) {
    e.preventDefault();

    if (todo !== '') {
      setData([
        ...data,
        {
          id: new Date(),
          name: todo.trim(),
        },
      ]);
    }

    setTodo('');
  }

  return (
    <div>
      <h2 className="addTitle">Добавить задачу</h2>
      <form className="addTodos" onSubmit={handleAddFormSubmit}>
        <input
          className="todo-input"
          name="name"
          type="text"
          placeholder="Создайте новое задание"
          value={todo}
          onChange={handleAddInputChange}
        />
        <input
          className="add-btn"
          type="submit"
          value="+"
          onClick={() => dispatch(addTask(todo))}
        />
      </form>
    </div>
  );
}
