import React from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import Grid from './Grid';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${props => (props.green ? 'green' : 'palevioletred')};
`;

const RedTitle = styled(Title)`
  color: red;
`;

const CustomDiv = styled.div.attrs({
  marginright: props => props.size || '1rem',
})`
  width: 100%;
  height: 100px;
  background-color: ${props => props.color};
  margin-right: ${props => props.marginright};
  color: ${props => props.theme.main};
`;

CustomDiv.defaultProps = {
  theme: {
    main: 'palevioletred',
  },
};

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const theme = {
  main: 'mediumseagreen',
};

const App = () => (
  <div className="App">
    <Wrapper>
      <Title>
        Styled Title
      </Title>

      <Title green>
        Styled Title
      </Title>

      <RedTitle>
        Styled Title
      </RedTitle>

      <ThemeProvider theme={theme}>

        <CustomDiv color="blue" size="2rem">
          <Rotate>LOL</Rotate>
        </CustomDiv>


      </ThemeProvider>


    </Wrapper>
    <Grid />

  </div>
);

export default App;
