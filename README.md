
### Card Component

```
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
```

