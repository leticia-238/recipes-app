import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { setLocalStorage } from '../utils/localStorage';
import cooking from '../images/chief.png';

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
    <div
      style={ {
        backgroundColor: '#ed2d2d',
        height: '100vh',
      } }
      className="
       p-4 d-flex flex-column align-items-center justify-content-center"
    >

      <Form
        className="p-4 d-flex flex-column"
        style={ {
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          backgroundColor: 'white',
          boxShadow: 'var(--box-shadow)',
          gap: '8px',
        } }
      >
        <div
          style={ {
            backgroundColor: 'var(--btn-recipe-color)',
            gap: '4px',
            borderRadius: '6px',
          } }
          className="d-flex flex-column p-2 align-items-center"
        >
          <div className="mb-4">

            <img
              className="mt-2"
              style={ {
                textAlign: 'center',
                height: '100px',
              } }
              src={ cooking }
              alt="a"
            />

          </div>
          <h4
            style={ {
              fontWeight: '700',
              color: 'white',
            } }
          >
            Master Cooking

          </h4>
        </div>

        <Form.Group className="mb-2 mt-4" controlId="Form.ControlInputEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="Form.ControlInputPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Form.Group>
        <Button
          style={ {
            fontSize: '24px',
            fontWeight: '600',
            width: '100%',
            backgroundColor: 'var(--btn-recipe-color)',
          } }
          variant="primary"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ () => {
            setLocalStorage('user', { email });
            history.push('/foods');
          } }
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
