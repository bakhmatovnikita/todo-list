
import React, { useState } from 'react'
function ToDoForm({ addTask }) {
    const [userInput, setUserInput] = useState('')

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        addTask(userInput)
        setUserInput("")
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSumbit(e)
        }
    }
    return (
        <form onSubmit={handleSumbit}>
            <input
                value={userInput}
                type="text"
                onChange={e => handleChange(e)}
                onKeyDown={handleKeyPress}
                placeholder="Введите значение..."
            />
            <button>Сохранить</button>
        </form>
    )
}

export default ToDoForm;