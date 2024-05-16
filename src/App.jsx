import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './components/TodoList';
const initialTodos = [
  { id: 1, text: 'Buy groceries', completed: false, createdDate: '2023-01-01T10:00:00Z' },
  { id: 2, text: 'Walk the dog', completed: true, createdDate: '2023-01-02T11:00:00Z' },
  { id: 3, text: 'Read a book', completed: false, createdDate: '2023-01-03T12:00:00Z' },
  { id: 4, text: 'Write some code', completed: false, createdDate: '2023-01-04T13:00:00Z' },
  { id: 5, text: 'Go to the gym', completed: true, createdDate: '2023-01-05T14:00:00Z' },
  { id: 6, text: 'Call mom', completed: false, createdDate: '2023-01-06T15:00:00Z' },
  { id: 7, text: 'Clean the house', completed: false, createdDate: '2023-01-07T16:00:00Z' },
  { id: 8, text: 'Pay bills', completed: true, createdDate: '2023-01-08T17:00:00Z' },
  { id: 9, text: 'Schedule dentist appointment', completed: false, createdDate: '2023-01-09T18:00:00Z' },
  { id: 10, text: 'Plan vacation', completed: false, createdDate: '2023-01-10T19:00:00Z' },
];
function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  const [todo, setTodo] = useState("");
  const [sortOption, setSortOption] = useState('date-asc'); // default sort option is by date ascending

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todo) return;

    setTodos([...todos, {
      text: todo,
      id: Date.now(),
      completed: false,
      createdDate: new Date().toISOString()
    }]);
    setTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const getSortedTodos = () => {
    return [...todos].sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return new Date(a.createdDate) - new Date(b.createdDate);
        case 'date-desc':
          return new Date(b.createdDate) - new Date(a.createdDate);
        case 'name-asc':
          return a.text.localeCompare(b.text);
        case 'name-desc':
          return b.text.localeCompare(a.text);
        case 'completed':
          return a.completed - b.completed;
        case 'not-completed':
          return b.completed - a.completed;
        default:
          return 0;
      }
    });
  };

  const sortedTodos = getSortedTodos();
  localStorage.clear()
  return (
    <div className='wrapper'>
      <div className='form-control'>
       <h1 className='text-red-500'>To-Do List</h1>
      <form onSubmit={addTodo} className='input-w-btn'>
        <input
          className=''
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onBlur={addTodo}
          placeholder="Add a new task"
        />
        <button type="submit" className='submit-btn'>Add</button>
      </form>
      </div>
    {
      sortedTodos?.length > 0 && <div className='sorting-order'>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="date-asc">Highest Date</option>
        <option value="date-desc">Lowest Date</option>
        <option value="name-asc">A-Z</option>
        <option value="name-desc">Z-A</option>
        <option value="completed">Not Completed</option>
        <option value="not-completed">Completed</option>
      </select>
    </div>
    }  
      <TodoList todos={sortedTodos} removeTodo={removeTodo} toggleTodo={toggleTodo} editTodo={editTodo}/>
      {todos.length > 0 && <button onClick={clearTodos}>Clear All</button>}

    </div>
  )
}

export default App
