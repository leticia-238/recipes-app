import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          type="text"
          id="password-input"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
};

export default Login;
