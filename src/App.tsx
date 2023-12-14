import React from 'react';
import styled from 'styled-components';

function App() {
    return <>
    <HomeBox>
안녕하세요 잘되나요?
    </HomeBox>
    </>;
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
  `;