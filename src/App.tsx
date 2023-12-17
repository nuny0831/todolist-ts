import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {createTodo, deleteTodo, getTodos, updateTodo} from './api/todos';
import {CreateTodoInput, DeleteTodoInput, Todo, UpdateTodoInput} from './types/todo';

function App() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const {isLoading, data: todos} = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const {mutate: createTodoMutate} = useMutation({
    mutationFn: (input: CreateTodoInput) => createTodo(input.title, input.content),
    onSuccess: () => {
      setTitle('');
      setContent('');
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: err => {
      console.log(err);
    },
  });

  const {mutate: deleteTodoMutate} = useMutation({
    mutationFn: (input: DeleteTodoInput) => deleteTodo(input.id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: err => {
      console.log(err);
    },
  });

  const {mutate: updateTodoMutate} = useMutation({
    mutationFn: (input: UpdateTodoInput) => updateTodo(input.id, input.isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: err => {
      console.log(err);
    },
  });

  const clickAddTodo = (): void => {
    if (!title || !content) {
      toast.error('제목과 내용을 입력해주세요');
      return;
    }
    createTodoMutate({
      title,
      content,
    });
  };

  const clickDeleteTodo = (id: string): void => {
    deleteTodoMutate({id});
  };

  const clickUpdateTodo = (id: string, isDone: boolean): void => {
    updateTodoMutate({id, isDone});
  };

  if (isLoading) return <div>로딩중...</div>;
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
            ?.filter((todo: Todo) => todo.isDone === false)
            .map((todo: Todo, index) => (
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
            ?.filter((todo: any) => todo.isDone === true)
            .map((todo: any, index) => (
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
