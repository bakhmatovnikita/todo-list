import { useState } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditForm from './EditForm';
import './styles.css';
import { DataList } from './MyContext';

export default function App() {
  const [todo, setTodo] = useState('');
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  return (
    <div className="App">
      <DataList>
        <form>
          <input
            type="text"
            className="formSearch"
            name="search"
            placeholder="🔍   Поиск по задачам "
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
        {isEditing ? (
          <EditForm
            todo={todo}
            setTodo={setTodo}
            currentTodo={currentTodo}
            setIsEditing={setIsEditing}
            setCurrentTodo={setCurrentTodo}
          />
        ) : (
          <AddTodoForm value={value} setValue={setValue} todo={todo} setTodo={setTodo} />
        )}

        <ul className="todo-list">
          <TodoItem
            setCurrentTodo={setCurrentTodo}
            setIsEditing={setIsEditing}
            value={value}
            todo={todo}
            setTodo={setTodo}
          />
        </ul>
      </DataList>
    </div>
  );
}
