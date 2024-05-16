import React,{useState} from 'react';

const TodoItem = ({ todo, toggleTodo, removeTodo,editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    editTodo(todo.id, editText);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <li className='wrapper-item'>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
    />
    {isEditing ? (
      <>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </>
    ) : (
      <>
        <span onClick={handleEdit}  style={{width:'200px', textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
        <span style={{ marginLeft: '10px', fontSize: '0.8em', color: '#888',width:'150px' }}>
          {formatDate(todo.createdDate)}
        </span>
        <button className='' onClick={() => removeTodo(todo.id)}>Remove</button>
      </>
    )}
  </li>
  );
};

export default TodoItem;
