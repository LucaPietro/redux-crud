import React from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { LoginContainer } from './styles';
import api from '../../services/api';

const Login = () => {
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('username', response.data.username);
      history.push('/');
    } catch (err) {
      alert('Falha no login, tente novamente.', err);
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <LoginContainer maxWidth="xl">
        <h1>CRUD</h1>
        <form onSubmit={handleLogin} noValidate autoComplete="off">
          <TextField id="username" type="text" name="username" label="Usuário" variant="outlined" />
          <TextField
            id="password"
            type="password"
            name="password"
            label="Senha"
            variant="outlined"
          />
          <Button type="submit" variant="contained" size="large" color="primary">
            Entrar
          </Button>
        </form>
      </LoginContainer>
    </React.Fragment>
  );
};

export default Login;
