import React from "react";

function ToDo({ todo, toggleTask, removeTask }) {
    return (
        <div key={todo.id} className="item-todo">
            <div onClick={() => toggleTask(todo.id)} className={todo.complete ? "item-text strike" : "item-text"}>
                {todo.task}
            </div>
            <div className="item-delete" onClick={() => removeTask(todo.id)}>
                X
            </div>
        </div>
    )
}

export default ToDo;