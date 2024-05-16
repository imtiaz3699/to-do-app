import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, removeTodo,editTodo }) => {
  return (
    <ul className='' style = {{display:'flex',flexDirection:'column',gap:'10px'
    }}>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
