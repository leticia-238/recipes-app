import React from 'react';
import { screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from './helpers/fetchMock';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';
import { setLocalStorage } from '../utils/localStorage';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const getRecipesOnScreen = (numberOfRecipes) => {
  const recipeListImages = screen.getAllByTestId(/-horizontal-image/);
  const recipeListTopText = screen.getAllByTestId(/-horizontal-top-text/);
  const recipeListNames = screen.getAllByTestId(/-horizontal-name/);
  const recipeListDoneDate = screen.getAllByTestId(/-horizontal-done-date/);
  const recipeListBtnShare = screen.getAllByTestId(/-horizontal-share-btn/);

  expect(recipeListImages).toHaveLength(numberOfRecipes);
  expect(recipeListTopText).toHaveLength(numberOfRecipes);
  expect(recipeListNames).toHaveLength(numberOfRecipes);
  expect(recipeListDoneDate).toHaveLength(numberOfRecipes);
  expect(recipeListBtnShare).toHaveLength(numberOfRecipes);
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  cleanup();
});

describe('Testa a Tela de Receitas Feitas', () => {
  beforeEach(async () => {
    setLocalStorage('doneRecipes', doneRecipes);
    await act(async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/done-recipes');
    });
  });

  it('Verifica se a página contém os filtros de receitas', () => {
    const btnFilterByAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterByFoods = screen.getByTestId('filter-by-food-btn');
    const btnFilterByDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(btnFilterByAll).toBeInTheDocument();
    expect(btnFilterByFoods).toBeInTheDocument();
    expect(btnFilterByDrinks).toBeInTheDocument();
  });

  it('Verifica se a lista de receita é mostrada caso haja receitas feitas',
    () => {
      const numberOfRecipes = 2;
      getRecipesOnScreen(numberOfRecipes);
    });

  it('Testa os filtros de receitas', async () => {
    const btnFilterByAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterByFoods = screen.getByTestId('filter-by-food-btn');
    const btnFilterByDrinks = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(btnFilterByFoods);
    const numberOfFoods = 1;
    getRecipesOnScreen(numberOfFoods);

    const foodName = screen.getByText('Spicy Arrabiata Penne');
    expect(foodName).toBeInTheDocument();

    userEvent.click(btnFilterByDrinks);
    const numberOfDrinks = 1;
    getRecipesOnScreen(numberOfDrinks);

    const drinkName = screen.getByText('Aquamarine');
    expect(drinkName).toBeInTheDocument();

    userEvent.click(btnFilterByAll);
    const numberOfRecipes = 2;
    getRecipesOnScreen(numberOfRecipes);
  });

  it('Verifica se é redirecionado para a página de detalhes da receita caso o nome'
  + 'da receita seja clicado', async () => {
    const recipeName = screen.getByTestId('0-horizontal-name');

    await act(async () => { userEvent.click(recipeName); });

    expect(recipeName).not.toBeInTheDocument();

    const titleRecipeDetails = screen.getByText(/Foods Details/i);
    expect(titleRecipeDetails).toBeInTheDocument();
  });

  it('Verifica se é redirecionado para a página de detalhes da receita caso a'
  + 'imagem da receita seja clicada', async () => {
    const recipeImage = screen.getByTestId('0-horizontal-image');

    await act(async () => { userEvent.click(recipeImage); });

    expect(recipeImage).not.toBeInTheDocument();

    const titleRecipeDetails = screen.getByText(/Foods Details/i);
    expect(titleRecipeDetails).toBeInTheDocument();
  });
});
