export default function EditForm({
  currentTodo,
  setIsEditing,
  onEditInputChange,
  onEditFormSubmit,
}) {
  return (
    <form onSubmit={onEditFormSubmit}>
      <h2>Редактировать задачу</h2>
      <label htmlFor="updateTodo">Обновить задачу: </label>
      <input
        name="updateTodo"
        type="text"
        placeholder="Update todo"
        value={currentTodo.text}
        onChange={onEditInputChange}
      />
      <button type="submit" onClick={onEditFormSubmit}>
        Обновить
      </button>
      <button onClick={() => setIsEditing(false)}>Отменить</button>
    </form>
  );
}
