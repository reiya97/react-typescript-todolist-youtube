import React, { useRef, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const inputRef = useRef<HTMLElement>();
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: string;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    console.log(e)
    // inputRef;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(inputValue==="") return;

    //新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: uuidv4(),
      checked: false,
    }
    
    setTodos([newTodo, ...todos]);
    setInputValue("");
  }

  const handleEdit = (id: string, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    })

    setTodos(newTodos);
  }

  const handleChecked = (id: string, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    })

    setTodos(newTodos);
  }

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => todo.checked !== true);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2>Todo List</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input value={inputValue} type="text" onChange={(e) => handleChange(e)} className='inputText'/>
          <input type="submit" value="Add" className='submitButton'/>
          <button onClick={handleClear}>Delete All</button>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)} 
                className='inputText'
                value={todo.inputValue}
                disabled={todo.checked}
                />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
                />
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
