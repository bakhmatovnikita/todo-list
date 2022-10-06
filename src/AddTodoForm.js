import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from './MyContext';

export default function AddTodoForm({ todo, setTodo }) {
  const [data, setData] = useContext(DataContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (input) => {
    const id = new Date();
    setData([...data, { id, name: input.name }]);
  };
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
    <form onSubmit={handleAddFormSubmit}>
      <h2>Добавить задачу</h2>
      <label htmlFor="name">Создать задачу: </label>
      <input
        name="name"
        type="text"
        placeholder="Создайте новое задание"
        value={todo}
        onChange={handleAddInputChange}
      />
      <input type="submit" value="Add" onChange={handleAddInputChange} />
    </form>
  );
}
