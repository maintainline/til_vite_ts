import React, { useState } from 'react';
import { useTodos } from '../../contexts/TodoContext';
import { createTodos } from '../../services/todoServices';
import type { TodoInsert } from '../../types/TodoType';

type TodoWriteProps = {
  children?: React.ReactNode;
};
const TodoWrite = ({}: TodoWriteProps): JSX.Element => {
  // Context 를 사용함.
  const { addTodo } = useTodos();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
  //  supabase 에 데이터를 insert 한다. : 비동기

  const handleSave = async (): Promise<void> => {
    if (!title.trim()) {
      alert('제목을 입력하세요');
      return;
    }

    try {
      const newTodo: TodoInsert = { title, content };
      // supabase 에 데이터를 insert 함
      // insert 결과로 추가가 된  todo 형태를 받아옴
      const result = await createTodos(newTodo);
      if (result) {
        // context 에 todo type 데이터를 추가해 줌.
        addTodo(result);
      }
      // 현재 Write 컴포넌트 state 초기화
      setTitle('');
      setContent('');
    } catch (error) {
      console.log(error);
      alert('데이터 추가에 실패 하였습니다.');
    }
  };

  return (
    <div>
      <h2>할일 작성</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={e => handleChange(e)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <button onClick={handleSave}>등록</button>
      </div>
    </div>
  );
};

export default TodoWrite;
