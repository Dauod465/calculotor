import React from 'react';
import Calculator from './components/Calculator';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
`;

const App = () => {
  return (
    <AppContainer>
      <Calculator />
    </AppContainer>
  );
};

export default App; 