import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';
import EditForm from './components/EditForm';
import './css/main.css';
import { DataList } from './components/MyContext';
import store from './redux';

export default function App() {
  const [todo, setTodo] = useState('');
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const dispatch = useDispatch();
  const todos = useSelector((store) => store.tasks.todos);
  console.log(todos);

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
          <AddTodoForm
            value={value}
            setValue={setValue}
            todo={todo}
            setTodo={setTodo}
            dispatch={dispatch}
          />
        )}

        <ul className="todo-list">
          <TodoItem
            setCurrentTodo={setCurrentTodo}
            setIsEditing={setIsEditing}
            value={value}
            todo={todo}
            setTodo={setTodo}
            dispatch={dispatch}
          />
        </ul>
      </DataList>
    </div>
  );
}
