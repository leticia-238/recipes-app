import React from 'react';
import { screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import ExploreNationalities from '../pages/ExploreNationalities';
import fetchMock from './helpers/fetchMock';

const TWELVE = 12;

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('Teste a página Explore Nationalities', () => {
  it('Teste se contém um select na página', async () => {
    await act(async () => {
      renderWithRouterAndContext(<ExploreNationalities />);
    });

    const select = screen.getByTestId('explore-by-nationality-dropdown');
    expect(select).toBeInTheDocument();

    const option = screen.getByText(/All/i);
    expect(option).toBeInTheDocument();
  });

  it('Teste se a requisição a API de comidas é feita ao carregar a'
  + ' página ', async () => {
    await act(async () => {
      renderWithRouterAndContext(<ExploreNationalities />);
    });
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se renderiza 12 receitas ao carregar a página', async () => {
    await act(async () => {
      renderWithRouterAndContext(<ExploreNationalities />);
    });
    const recipes = screen.getAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(TWELVE);

    const firstRecipe = screen.getByRole('img', { name: /corba/i, hidden: true });
    expect(firstRecipe).toBeInTheDocument();
  });

  it('teste se contem um footer na página', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(<ExploreNationalities />);

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
});
