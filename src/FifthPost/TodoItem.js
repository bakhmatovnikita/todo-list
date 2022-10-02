export default function TodoItem({ todo, onEditClick, onDeleteClick }) {
  return (
    <li key={todo.id}>
      {todo.text}
      <button onClick={() => onEditClick(todo)}>Редактировать</button>
      <button onClick={() => onDeleteClick(todo.id)}>Удалить</button>
    </li>
  );
}
