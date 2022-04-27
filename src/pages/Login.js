import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { setLocalStorage } from '../utils/localStorage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /\S+@\S+\.com/;
    const numChar = 6;
    const isValid = emailRegex.test(email) && password.trim().length > numChar;
    setDisabled(!isValid);
  }, [email, password]);

  const history = useHistory();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          id="email-input"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          id="password-input"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ () => {
          setLocalStorage('user', { email });
          history.push('/foods');
        } }
      >
        Enter
      </Button>
    </Form>
  );
};

export default Login;
