export default function TodoItem({ todo, onEditClick, onDeleteClick, toggleTask }) {
  return (
    <li key={todo.id} className="item-todo">
      <div
        onClick={() => toggleTask(todo.id)}
        className={todo.complete ? 'item-text strike' : 'item-text'}>
        {todo.text}
      </div>
      <button onClick={() => onEditClick(todo)}>Редактировать</button>
      <button onClick={() => onDeleteClick(todo.id)}>Удалить</button>
    </li>
  );
}
