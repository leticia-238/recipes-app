import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouterAndContext';
import NotFound from '../pages/NotFound';
import App from '../App';

describe('Teste o componente NotFound', () => {
  it('Teste se página contém um heading h1 com o texto Page not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { level: 1,
      name: /Page not found/i });
    expect(heading).toBeDefined();
  });

  it('Teste se digitando uma URL desconhecida, é redirecionada para a página Not Found ',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/xablau');

      const heading = screen.getByRole('heading', { level: 1,
        name: /Page not found/i });
      expect(heading).toBeInTheDocument();
    });
});
