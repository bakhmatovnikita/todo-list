export default function AddTodoForm({ todo, onAddFormSubmit, onAddInputChange }) {
  return (
    <form onSubmit={onAddFormSubmit}>
      <h2>Добавить задачу</h2>
      <label htmlFor="todo">Создать задачу: </label>
      <input
        name="todo"
        type="text"
        placeholder="Создайте новое задание"
        value={todo}
        onChange={onAddInputChange}
      />
    </form>
  );
}
