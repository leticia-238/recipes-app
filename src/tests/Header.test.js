import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

const THREE = 3;
const PATH_EXP_FOODS = '/explore/foods';
const PATH_EXP_DRINKS = '/explore/drinks';
const PATH_EXP_FOODS_NATIONALITY = '/explore/foods/nationalities';

describe('Teste o componente Header/HeaderSearchBar', () => {
  it('teste se contém um header na tela Foods', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');

    const foodsTitle = screen.getByRole('heading', { name: /Foods/i, level: 1 });
    expect(foodsTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    // botão "search" no header
    history.push('/foods');
    const btnSearch = screen.getByAltText(/search button/i);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const input = screen.getByRole('textbox');
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const radioName = screen.getByRole('radio', { name: /name/i });
    const radioLetter = screen.getByRole('radio', { name: /first letter/i });
    const radios = screen.getAllByRole('radio');

    expect(input).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(radios).toHaveLength(THREE);
  });

  it('teste se contém um header na tela Drinks', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');

    const drinksTitle = screen.getByRole('heading', { name: /Drinks/i, level: 1 });
    expect(drinksTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();

    // botão "search" no header
    const btnSearch = screen.getByAltText(/search button/i);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const input = screen.getByRole('textbox');
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const radioName = screen.getByRole('radio', { name: /name/i });
    const radioLetter = screen.getByRole('radio', { name: /first letter/i });
    const radios = screen.getAllByRole('radio');

    expect(input).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(radios).toHaveLength(THREE);
  });

  it('teste se contém um header na tela Explore', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');

    const exploreTitle = screen.getByRole('heading', { name: /Explore/i, level: 1 });
    expect(exploreTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');

    history.push('/explore');

    const btnExploreFoods = screen.getByRole('button', { name: /Explore Foods/i });
    expect(btnExploreFoods).toBeInTheDocument();
    userEvent.click(btnExploreFoods);
    expect(history.location.pathname).toBe(PATH_EXP_FOODS);

    history.push('/explore');
    const btnExploreDrinks = screen.getByRole('button', { name: /Explore Drinks/i });
    expect(btnExploreDrinks).toBeInTheDocument();
    userEvent.click(btnExploreDrinks);
    expect(history.location.pathname).toBe('/explore/drinks');
  });

  it('teste se contém um header na tela Explore Foods', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATH_EXP_FOODS);

    const exploreFoodTitle = screen.getByRole('heading',
      { name: /Explore Foods/i, level: 1 });
    expect(exploreFoodTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');

    history.push(PATH_EXP_FOODS);
    const btnByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnByIngredient).toBeInTheDocument();
    userEvent.click(btnByIngredient);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');

    history.push(PATH_EXP_FOODS);
    const btnByNationality = screen.getByRole('button', { name: /By Nationality/i });
    expect(btnByNationality).toBeInTheDocument();
    userEvent.click(btnByNationality);
    expect(history.location.pathname).toBe(PATH_EXP_FOODS_NATIONALITY);

    history.push(PATH_EXP_FOODS);
    const btnBySurprise = screen.getByRole('button', { name: /Surprise me/i });
    expect(btnBySurprise).toBeInTheDocument();
  });

  it('teste se contém um header na tela Explore Drinks', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATH_EXP_DRINKS);

    const exploreDrinkTitle = screen.getByRole('heading',
      { name: /Explore Drinks/i, level: 1 });
    expect(exploreDrinkTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');

    history.push(PATH_EXP_DRINKS);
    const btnByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnByIngredient).toBeInTheDocument();
    userEvent.click(btnByIngredient);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');

    history.push(PATH_EXP_DRINKS);
    const btnBySurprise = screen.getByRole('button', { name: /Surprise me/i });
    expect(btnBySurprise).toBeInTheDocument();
  });

  it('teste se contém um header na tela Explore Ingredients', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods/ingredients');

    const exploreIngredientTitle = screen.getByRole('heading',
      { name: /Explore Ingredients/i, level: 1 });
    expect(exploreIngredientTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');
    // o header do Explore Ingredients é o mesmo p/ rota foods(acima) e drinks('/explore/drinks/ingredients')
  });

  it('teste se contém um header na tela Explore Nationalities', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATH_EXP_FOODS_NATIONALITY);

    const exploreNationalityTitle = screen.getByRole('heading',
      { name: /Explore Nationalities/i, level: 1 });
    expect(exploreNationalityTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');

    // botão "search" no header
    history.push(PATH_EXP_FOODS_NATIONALITY);
    const btnSearch = screen.getByAltText(/search button/i);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const input = screen.getByRole('textbox');
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const radioName = screen.getByRole('radio', { name: /name/i });
    const radioLetter = screen.getByRole('radio', { name: /first letter/i });
    const radios = screen.getAllByRole('radio');

    expect(input).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(radios).toHaveLength(THREE);
  });

  it('teste se contém um header na tela Done Recipes', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/done-recipes');

    const doneRecipesTitle = screen.getByRole('heading',
      { name: /Done Recipes/i, level: 1 });
    expect(doneRecipesTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');
  });

  it('teste se contém um header na tela Favorite Recipes', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/favorite-recipes');

    const favoriteRecipesTitle = screen.getByRole('heading',
      { name: /Favorite Recipes/i, level: 1 });
    expect(favoriteRecipesTitle).toBeInTheDocument();

    const btnProfile = screen.getByAltText(/profile button/i);
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');
  });
});
