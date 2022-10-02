import { useEffect, useState } from 'react';
import './styles.css';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== '') {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo('');
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);

    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);

    setCurrentTodo({ ...todo });
  }

  return (
    <div className="App">
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Редактировать задачу</h2>

          <label htmlFor="editTodo">Редактировать задачу: </label>

          <input
            name="editTodo"
            type="text"
            placeholder="Редактировать задачу"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />

          <button type="submit">Обновить</button>

          <button onClick={() => setIsEditing(false)}>Отменить</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h2>Добавить задачу</h2>

          <label htmlFor="todo">Добавить задачу: </label>
          <input
            name="todo"
            type="text"
            placeholder="Создайте новое задание"
            value={todo}
            onChange={handleInputChange}
          />
          <button type="submit">Добавить</button>
        </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)}>Редактировать</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
