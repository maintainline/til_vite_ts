import { useTodos } from '../../contexts/TodoContext';
import TodoItem from './TodoItem';
import React from 'react';

type TodoListProps = {};

const TodoList = ({}: TodoListProps): JSX.Element => {
  //context 사용
  const { todos } = useTodos();

  return (
    <div>
      <h2>TodoList</h2>
      <ul>
        {todos.map((item: any) => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
