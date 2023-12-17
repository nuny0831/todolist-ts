import styled from 'styled-components';
import {Todo} from '../types/todo';

function Card({
  todo,
  clickDeleteTodo,
  clickUpdateTodo,
}: {
  todo: Todo;
  clickDeleteTodo: (id: string) => void;
  clickUpdateTodo: (id: string, isDone: boolean) => void;
}) {
  if (todo.isDone)
    return (
      <DoneCard key={todo.id}>
        <TitleWorking>{todo.title}</TitleWorking>
        <ContentWorking>{todo.content}</ContentWorking>
        <ButtonBox>
          <button onClick={() => clickDeleteTodo(todo.id)}>삭제</button>
          <button onClick={() => clickUpdateTodo(todo.id, false)}>취소</button>
        </ButtonBox>
      </DoneCard>
    );
  else
    return (
      <WorkingCard key={todo.id}>
        <TitleWorking>{todo.title}</TitleWorking>
        <ContentWorking>{todo.content}</ContentWorking>
        <ButtonBox>
          <button onClick={() => clickDeleteTodo(todo.id)}>삭제</button>
          <button onClick={() => clickUpdateTodo(todo.id, true)}>완료</button>
        </ButtonBox>
      </WorkingCard>
    );
}

export default Card;

const WorkingCard = styled.div`
  background-color: #8b000090;
  width: 350px;
  height: 200px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const DoneCard = styled.div`
  background-color: #8b000020;
  width: 350px;
  height: 200px;
  color: darkred;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  button {
    border: 0;
    font-size: 15px;
    margin: 10px;
    padding: 7px;
    background-color: white;
    color: darkred;
    border-radius: 10px;
    font-weight: bold;
  }
`;

const TitleWorking = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const ContentWorking = styled.div`
  font-size: 15px;
  margin-bottom: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
  border: 0;

  button {
    border: 0;
    font-size: 15px;
    margin: 10px;
    padding: 7px;
    background-color: white;
    color: darkred;
    border-radius: 10px;
    font-weight: bold;
  }
`;
