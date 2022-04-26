import React, { useEffect, useState } from 'react';

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

  return (
    <form>
      <label htmlFor="email-input">
        email
        <input
          type="text"
          id="email-input"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        password
        <input
          type="password"
          id="password-input"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </form>
  );
};

export default Login;
