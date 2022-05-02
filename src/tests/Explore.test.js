import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Explore from '../pages/Explore';

describe('Teste o componente Explore', () => {
  it('Teste se contém um header na página Explore', () => {
    renderWithRouter(<Explore />);

    const exploreTitle = screen.getByRole('heading', { name: /Explore/i });
    const btnExplore = screen.getByAltText(/profile button/i);

    expect(exploreTitle).toBeInTheDocument();
    expect(btnExplore).toBeInTheDocument();
  });

  it('Teste se contém o botão "Explore Foods" na página Explore', () => {
    const { history } = renderWithRouter(<Explore />);

    const btnExploreFoods = screen.getByRole('button', { name: /Explore Foods/i });
    expect(btnExploreFoods).toBeInTheDocument();

    userEvent.click(btnExploreFoods);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });

  it('Teste se contém o botão "Explore Drinks" na página Explore', () => {
    const { history } = renderWithRouter(<Explore />);

    const btnExploreDrinks = screen.getByRole('button', { name: /Explore Drinks/i });
    expect(btnExploreDrinks).toBeInTheDocument();

    userEvent.click(btnExploreDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });

  it('Teste se contém um footer na página Profile', () => {
    const { history } = renderWithRouter(<Explore />);

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
