import React, { useState } from 'react';

const Login = () => {
  return (
    <form>
      <label htmlFor="email-input">
        email
        <input
          type="text"
          id="email-input"
          data-testid="email-input"
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
