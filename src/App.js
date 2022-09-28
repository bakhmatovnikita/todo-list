import React, { useEffect, useState } from 'react';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todoArray')));
  const [value, setValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todoArray', JSON.stringify(todos));
  }, [todos.length]);

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem('todoArray'));
    if (task) {
      setTodos(task);
    }
  }, []);
  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        task: userInput,
        complete: false,
      };
      setTodos([...todos, newItem]);
    }
  };

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const handleToggle = (id) => {
    const newArr = todos
      .slice()
      .map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }));
    setTodos([...newArr]);
  };
  const filterTask = todos.filter((item) => {
    return item.task.toLowerCase().includes(value.toLowerCase());
  });
  return (
    <div className="App">
      <form>
        <input
          type="text"
          // className=formSearch
          name="search"
          placeholder="Search"
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
      <header>
        <h1>Список задач: {todos.length}</h1>
      </header>
      <ToDoForm addTask={addTask} />
      {filterTask.map((todo) => {
        return <ToDo todo={todo} key={todo.id} toggleTask={handleToggle} removeTask={removeTask} />;
      })}
    </div>
  );
}

export default App;
