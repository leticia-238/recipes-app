import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import fetchMock from './helpers/fetchMock';

const checkElementsOnScreen = () => {
  const btnDrink = screen.getByAltText(/drink button/i);
  const btnExplore = screen.getByAltText(/explore button/i);
  const btnMeal = screen.getByAltText(/meal button/i);
  expect(btnDrink).toBeInTheDocument();
  expect(btnExplore).toBeInTheDocument();
  expect(btnMeal).toBeInTheDocument();
};

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('Teste o componente Footer', () => {
  it('teste se contém um footer na tela Foods', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods');
    });

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Drinks', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
    });

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/explore');
    });

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Foods', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/explore/foods');
    });

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Drinks', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/explore/drinks');
    });

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Ingredients', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/explore/foods/ingredients');
    });

    checkElementsOnScreen();
  });

  it('teste se contém um footer na tela Explore Nationalities', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/explore/foods/nationalities');
    });

    checkElementsOnScreen();
  });
});
