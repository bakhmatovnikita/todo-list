import { useContext } from 'react';
import { DataContext } from './MyContext';

export default function EditForm({ currentTodo, setIsEditing, setCurrentTodo, todo, setTodo }) {
  const [data, setData] = useContext(DataContext);

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, name: e.target.value });
    console.log(currentTodo);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = data.map((item) => {
      return item.id === id ? updatedTodo : item;
    });
    setIsEditing(false);
    setData(updatedItem);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  return (
    <div>
      <h2 className="addTitle">Редактировать задачу</h2>
      <form className="addTodos" onSubmit={handleEditFormSubmit}>
        <input
          className="todo-input"
          name="updateTodo"
          type="text"
          placeholder="Обновить задачу"
          value={currentTodo.name}
          onChange={handleEditInputChange}
        />
        <button className="add-btn" type="submit" onClick={handleEditFormSubmit}>
          +
        </button>
        <button className="add-btn" onClick={() => setIsEditing(false)}>
          x
        </button>
      </form>
    </div>
  );
}
