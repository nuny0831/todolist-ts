import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {createTodo, deleteTodo, getTodos, updateTodo} from './api/todos';

function App() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [todos, setTodos] = useState<any[]>([]);

  const clickAddTodo = async () => {
    await createTodo(title, content);
  };

  const clickDeleteTodo = async (id: string) => {
    await deleteTodo(id);
  };

  const clickUpdateTodo = async (id: string, isDone: boolean) => {
    await updateTodo(id, isDone);
  };

  useEffect(() => {
    getTodos().then(res => {
      setTodos(res);
    });
  }, [todos]);
  return (
    <>
      <HomeBox>
        <TitleBox>
          <TitleInput value={title} onChange={e => setTitle(e.target.value)} placeholder="제목"></TitleInput>
          <TitleInput value={content} onChange={e => setContent(e.target.value)} placeholder="할 일"></TitleInput>
          <button onClick={clickAddTodo}>추가</button>
        </TitleBox>
        <ListBox>
          할일
          {todos
            .filter(todo => todo.isDone === false)
            .map((todo, index) => (
              <Card key={index}>
                <div>제목{todo.title}</div>
                <div>내용{todo.content}</div>
                <button onClick={() => clickDeleteTodo(todo.id)}>삭제</button>
                <button onClick={() => clickUpdateTodo(todo.id, true)}>완료</button>
              </Card>
            ))}
        </ListBox>
        <ListBox>
          완료
          {todos
            .filter(todo => todo.isDone === true)
            .map((todo, index) => (
              <Card key={index}>
                <div>제목{todo.title}</div>
                <div>내용{todo.content}</div>
                <button onClick={() => clickDeleteTodo(todo.id)}>삭제</button>
                <button onClick={() => clickUpdateTodo(todo.id, false)}>취소</button>
              </Card>
            ))}
        </ListBox>
      </HomeBox>
    </>
  );
}

export default App;

const HomeBox = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleInput = styled.input`
  margin: 10px;
  font-size: 20px;
  padding-left: 10px;
`;

const TitleBox = styled.div`
  margin: 20px;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  border: 2px solid blue;
  width: 200px;
  height: 200px;
`;
