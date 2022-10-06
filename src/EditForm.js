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
    <form onSubmit={handleEditFormSubmit}>
      <h2>Редактировать задачу</h2>
      <label htmlFor="updateTodo">Обновить задачу: </label>
      <input
        name="updateTodo"
        type="text"
        placeholder="Обновить задачу"
        value={currentTodo.name}
        onChange={handleEditInputChange}
      />
      <button type="submit" onClick={handleEditFormSubmit}>
        Обновление
      </button>
      <button onClick={() => setIsEditing(false)}>Отменить</button>
    </form>
  );
}
