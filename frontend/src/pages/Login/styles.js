import styled from 'styled-components';
import Container from '@material-ui/core/Container';

export const LoginContainer = styled(Container)`
  height: 100vh;
  width: 100vw;
  background: rgb(250, 250, 250);
  padding: 20vh;

  h1 {
    text-align: center;
    font-family: 'Roboto';
    color: rgb(25, 118, 210);
  }

  form {
    display: flex;
    align-content: space-between;
    flex-direction: column;
    margin: 0 30vw 10vh 30vw;

    div {
      margin-top: 10px;
    }

    button {
      margin-top: 15px;
    }
  }
`;
