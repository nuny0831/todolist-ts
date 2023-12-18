
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

### 파일 구조

```
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜todos.ts
 ┃ ┣ 📂components
 ┃ ┃ ┗ 📜Card.tsx
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📜firebase.ts
 ┃ ┃ ┗ 📜GlobalStyle.tsx
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜todo.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜react-app-env.d.ts
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```

```
api/:

todos.ts: 할 일 목록과 관련된 데이터를 처리하는 API 파일.

components/:

Card.tsx: 재사용 가능한 React 컴포넌트인 Card 컴포넌트.
shared/:

firebase.ts: Firebase와 관련된 설정 및 유틸리티 함수를 포함하는 파일.

GlobalStyle.tsx: 전역 스타일을 정의하는 파일.

types/:

todo.ts: Todo 항목에 대한 TypeScript 타입 정의.

```
