import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

const checkElementsOnScreen = () => {
  const btnDrink = screen.getByAltText(/drink button/i);
  const btnExplore = screen.getByAltText(/explore button/i);
  const btnMeal = screen.getByAltText(/meal button/i);
  expect(btnDrink).toBeInTheDocument();
  expect(btnExplore).toBeInTheDocument();
  expect(btnMeal).toBeInTheDocument();
};

describe('Teste o componente Footer', () => {
  it('teste se contém um footer na tela Foods', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Drinks', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Foods', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods');

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Drinks', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/drinks');

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Ingredients', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods/ingredients');

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Nationalities', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods/nationalities');

    checkElementsOnScreen();
  });
});
