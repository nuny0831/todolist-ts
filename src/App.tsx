import React from 'react';
import styled from 'styled-components';

function App() {
  return (
    <>
      <HomeBox>
        <TitleBox>
          <TitleInput placeholder="제목"></TitleInput>
          <TitleInput placeholder="할 일"></TitleInput>
          <button>추가</button>
        </TitleBox>
        <ListBox>
          할일
          <Card>
            <div>제목</div>
            <div>내용</div>
            <button>삭제</button>
            <button>완료</button>
          </Card>
        </ListBox>
        <ListBox>
          완료
          <Card>
            <div>제목</div>
            <div>내용</div>
            <button>삭제</button>
            <button>취소</button>
          </Card>
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
