import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';

describe('Teste a página Explore Foods e Drinks', () => {
  it('Teste se contém o botão "By Ingredient" na página', () => {
    const { history } = renderWithRouterAndContext(<ExploreFoods />);

    const btnByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnByIngredient).toBeInTheDocument();
    userEvent.click(btnByIngredient);
    expect(history.location.pathname).toBe('/foods/ingredients');
  });

  it('Teste se contém o botão "By Nationality" na página', () => {
    const { history } = renderWithRouterAndContext(<ExploreFoods />);

    const btnByNationality = screen.getByRole('button', { name: /By Nationality/i });
    expect(btnByNationality).toBeInTheDocument();
    userEvent.click(btnByNationality);
    expect(history.location.pathname).toBe('/foods/nationalities');
  });

  it('Teste se contém o botão "Surprise me!" na página', () => {
    renderWithRouterAndContext(<ExploreFoods />);

    const btnSurpriseMe = screen.getByRole('button', { name: /Surprise me/i });
    expect(btnSurpriseMe).toBeInTheDocument();
  });

  it('Teste se contém o botão "By Ingredient" na página', () => {
    const { history } = renderWithRouterAndContext(<ExploreDrinks />);

    const btnByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnByIngredient).toBeInTheDocument();
    userEvent.click(btnByIngredient);
    expect(history.location.pathname).toBe('/drinks/ingredients');
  });

  it('Teste se contém o botão "Surprise me!" na página', () => {
    renderWithRouterAndContext(<ExploreDrinks />);

    const btnSurpriseMe = screen.getByRole('button', { name: /Surprise me/i });
    expect(btnSurpriseMe).toBeInTheDocument();
  });
});
