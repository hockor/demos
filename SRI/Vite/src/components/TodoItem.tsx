import React from 'react';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div className="todo-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        style={{ marginRight: '10px' }}
      />
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none',
        flex: 1,
        marginRight: '10px'
      }}>
        {todo.text}
      </span>
      <button 
        onClick={() => deleteTodo(todo.id)}
        style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        删除
      </button>
    </div>
  );
};

export default TodoItem; 