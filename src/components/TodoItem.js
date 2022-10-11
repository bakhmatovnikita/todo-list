import { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DataContext } from './MyContext';
import Edit from '../png/edit.png';
import Delete from '../png/delete.png';

export default function TodoItem({ setCurrentTodo, setIsEditing, value }) {
  const [data, setData] = useContext(DataContext);
  const handleEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };
  const handleToggle = (id) => {
    const newArr = data
      .slice()
      .map((item) => (item.id === id ? { ...item, complete: !item.complete } : { ...item }));
    setData([...newArr]);
  };

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }
  function handleDeleteClick(id) {
    const removeItem = data.filter((item) => {
      return item.id !== id;
    });
    setData(removeItem);
  }
  const filterTask = data.filter((item) => {
    return item.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <div className="displaytodos">
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {filterTask.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={snapshot.isDragging ? 'selected' : 'card'}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}>
                      <li key={item.id}>
                        <input type="checkbox" onClick={() => handleToggle(item.id)} />
                        <div className={item.complete ? 'item-text strike' : 'item-text'}>
                          {item.name}
                        </div>
                        <div className="btns">
                          <img src={Edit} onClick={() => handleEditClick(item)} />
                          <img src={Delete} onClick={() => handleDeleteClick(item.id)} />
                        </div>
                      </li>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
