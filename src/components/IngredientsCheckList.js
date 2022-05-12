import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

const IngredientsCheckList = () => {
  const { selectedRecipe, inProgressRecipes, setInProgressRecipes,
    doneRecipes, setDoneRecipes } = useContext(AppContext);

  const history = useHistory();

  const { ingredientsList, type, id } = selectedRecipe;
  const [isCheckedIngredients, setIsCheckedIngredients] = useState({});

  const [isDisabled, setIsDisabled] = useState(true);

  const doneRecipe = {
    ...selectedRecipe,
    type: type === 'meals' ? 'food' : 'drink',
    doneDate: '23/06/2020',
  };

  useEffect(() => {
    let savedIngredients = [];
    if (inProgressRecipes[type]) {
      savedIngredients = inProgressRecipes[type][id] || [];
    }
    const defaultCheckedState = ingredientsList.reduce((obj, ingredient, index) => {
      obj[index] = savedIngredients.includes(ingredient);
      return obj;
    }, {});

    setIsCheckedIngredients(defaultCheckedState);
  }, [id, ingredientsList, type, inProgressRecipes]);

  const saveCheckedIngredients = (stateObj) => {
    const usedIngredients = ingredientsList.filter((elm, index) => (stateObj[index]));
    const progressRecipesList = { ...inProgressRecipes[type], [id]: usedIngredients };

    setInProgressRecipes({ ...inProgressRecipes, [type]: progressRecipesList });
  };

  const conditional = Object.keys(isCheckedIngredients).length > 0;

  return (
    <section>
      <h3 className="p-2">Ingredientes</h3>
      {
        conditional
        && ingredientsList.map((ingredient, index) => (
          <div
            className="p-1"
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <ToggleButton
              style={ {
                gap: '8px',
              } }
              className="p-2 d-flex align-items-center"
              id={ `${index}-ingredient` }
              type="checkbox"
              variant="secondary"
              checked={ isCheckedIngredients[index] }
              value={ ingredient }
              onChange={ ({ currentTarget }) => {
                const obj = { ...isCheckedIngredients, [index]: currentTarget.checked };
                setIsCheckedIngredients(obj);
                saveCheckedIngredients(obj);
                if (!(Object.values(obj).includes(false))) {
                  setDoneRecipes([...doneRecipes, doneRecipe]);
                  setIsDisabled(false);
                } else {
                  setDoneRecipes(doneRecipes.filter((recipe) => (recipe.id !== id)));
                  setIsDisabled(true);
                }
              } }
            >
              {ingredient}
            </ToggleButton>
          </div>))
      }
      <button
        type="button"
        className="button-recipe"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        FinishRecipe
      </button>
    </section>
  );
};

export default IngredientsCheckList;
