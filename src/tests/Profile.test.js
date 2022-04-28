import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Teste o componente Profile', () => {
  it('Teste se contém um header na página Profile', () => {
    renderWithRouter(<Profile />);

    const profileTitle = screen.getByRole('heading', { name: /Profile/i });
    const btnProfile = screen.getByAltText(/profile button/i);

    expect(profileTitle).toBeInTheDocument();
    expect(btnProfile).toBeInTheDocument();
  });

  it('Teste se contém 3 botões na sessão principal da página Profile', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnDoneRecipes = screen.getByRole('button', { name: /Done Recipes/i });
    const btnFavoriteRecipes = screen.getByRole('button', { name: /Favorite Recipes/i });
    const btnLogout = screen.getByRole('button', { name: /Logout/i });
    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();

    userEvent.click(btnDoneRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');

    userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se contém um footer na página Profile', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnDrink = screen.getByAltText(/drink button/i);
    const btnExplore = screen.getByAltText(/explore button/i);
    const btnMeal = screen.getByAltText(/meal button/i);
    expect(btnDrink).toBeInTheDocument();
    expect(btnExplore).toBeInTheDocument();
    expect(btnMeal).toBeInTheDocument();

    userEvent.click(btnDrink);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    userEvent.click(btnExplore);
    expect(history.location.pathname).toBe('/explore');

    userEvent.click(btnMeal);
    expect(history.location.pathname).toBe('/foods');
  });
});
