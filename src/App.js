import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditForm from './EditForm';
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
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleAddInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();

    if (todo !== '') {
      setTodos([
        ...todos,
        {
          id: new Date(),
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

  const filterTask = todos.filter((item) => {
    return item.text.toLowerCase().includes(value.toLowerCase());
  });

  const handleToggle = (id) => {
    const newArr = todos
      .slice()
      .map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }));
    setTodos([...newArr]);
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          className="formSearch"
          name="search"
          placeholder="Поиск по задачам "
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
      {isEditing ? (
        <EditForm
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditFormSubmit}
        />
      ) : (
        <AddTodoForm
          todo={todo}
          onAddInputChange={handleAddInputChange}
          onAddFormSubmit={handleAddFormSubmit}
        />
      )}

      <ul className="todo-list">
        {filterTask.map((todo) => (
          <TodoItem
            todo={todo}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            toggleTask={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}
