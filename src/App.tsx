import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {createTodo, deleteTodo, getTodos, updateTodo} from './api/todos';
import {CreateTodoInput, DeleteTodoInput, Todo, UpdateTodoInput} from './types/todo';
import Card from './components/Card';
import Swal from 'sweetalert2';
import {BarLoader} from 'react-spinners';

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

  const clickDeleteTodo = async (id: string): Promise<void> => {
    const res = await Swal.fire({
      title: '삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    });

    if (res.isConfirmed) {
      deleteTodoMutate({id});
    }
  };

  const clickUpdateTodo = (id: string, isDone: boolean): void => {
    updateTodoMutate({id, isDone});
  };

  if (isLoading) return <BarLoader color={'darkred'} height={10} width={300} />;
  return (
    <>
      <HomeBox>
        <NavBox>
          <h1>My Todo List 💡</h1>
        </NavBox>
        <TitleBox>
          <TitleInput value={title} onChange={e => setTitle(e.target.value)} placeholder="제목"></TitleInput>
          <ContentInput value={content} onChange={e => setContent(e.target.value)} placeholder="내용"></ContentInput>
          <button onClick={clickAddTodo}>추가하기</button>
        </TitleBox>
        <Title>working🔥</Title>
        <ListBox>
          {todos
            ?.filter((todo: Todo) => todo.isDone === false)
            .map((todo: Todo, index) => (
              <Card key={index} todo={todo} clickDeleteTodo={clickDeleteTodo} clickUpdateTodo={clickUpdateTodo} />
            ))}
        </ListBox>
        <Title>Done😊</Title>
        <ListBox>
          {todos
            ?.filter((todo: any) => todo.isDone === true)
            .map((todo: any, index) => (
              <Card key={index} todo={todo} clickDeleteTodo={clickDeleteTodo} clickUpdateTodo={clickUpdateTodo} />
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
  align-items: center;
  flex-direction: column;
`;

const TitleInput = styled.input`
  margin: 10px;
  border: 0;
  height: 30px;
  width: 250px;
  margin-right: 30px;
  padding-left: 10px;
`;

const ContentInput = styled.input`
  margin: 10px;
  height: 30px;
  width: 500px;
  border: 0;
  margin-right: 30px;
  padding-left: 10px;
`;

const TitleBox = styled.div`
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  background-color: #8b000030;
  margin-bottom: 50px;
  width: 100%;

  button {
    border: 0;
    background-color: darkred;
    color: white;
    width: 80px;
    height: 30px;
    margin-right: 30px;
    cursor: pointer;
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 50px;
  margin: 10px;
`;

const NavBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: darkred;
  padding: 0 50px 0 50px;
  width: 100%;
  height: 75px;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`;
