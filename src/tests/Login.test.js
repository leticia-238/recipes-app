import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const BTN_LOGIN_TEST_ID = 'login-submit-btn';

const VALID_EMAIL = 'name@gmail.com';
const VALID_PASSWORD = '1234567';
const INVALID_EMAIL = 'name@gmail';
const INVALID_PASSWORD = '123456';

describe('Testa a Tela de Login', () => {
  it('Verifica se inputs e o botão estão na tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(EMAIL_TEST_ID);
    const password = screen.getByTestId(PASSWORD_TEST_ID);
    const btnLoginSubmit = screen.getByTestId(BTN_LOGIN_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnLoginSubmit).toBeInTheDocument();
  });

  it('Verifica se o botão está desabilitado caso o email ou a senha sejam inválidos',
    () => {
      renderWithRouter(<App />);
      const email = screen.getByTestId(EMAIL_TEST_ID);
      const password = screen.getByTestId(PASSWORD_TEST_ID);
      const btnLoginSubmit = screen.getByTestId(BTN_LOGIN_TEST_ID);

      expect(btnLoginSubmit).toBeDisabled();

      userEvent.type(email, INVALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
      expect(btnLoginSubmit).toBeDisabled();

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, INVALID_PASSWORD);
      expect(btnLoginSubmit).toBeDisabled();
    });

  it('Verifica se o botão é habilitado caso o email ou a senha sejam válidos', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(EMAIL_TEST_ID);
    const password = screen.getByTestId(PASSWORD_TEST_ID);
    const btnLoginSubmit = screen.getByTestId(BTN_LOGIN_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(btnLoginSubmit).toBeEnabled();
  });
  it('Redireciona a pessoa para a tela principal de receitas de comidas após clicar'
  + ' no botão', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(EMAIL_TEST_ID);
    const password = screen.getByTestId(PASSWORD_TEST_ID);
    const btnLoginSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    fireEvent.click(btnLoginSubmit);

    const { pathname } = history.location;

    expect(pathname).toBe('/foods');
  });
});
