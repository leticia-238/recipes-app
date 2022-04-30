import React, { useEffect, useState } from 'react';
// import { ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

const defaultData = { meals: {}, cocktails: {} };
const inProgressRecipes = getLocalStorage('inProgressRecipes') || defaultData;

const IngredientsCheckList = ({ ingredientsList, type, id }) => {
  const [isCheckedIngredients, setIsCheckedIngredients] = useState({});

  const recipeType = type === 'drinks' ? 'cocktails' : 'meals';

  useEffect(() => {
    const savedIngredients = inProgressRecipes[recipeType][id] || [];
    const defaultCheckedState = ingredientsList.reduce((obj, ingredient, index) => {
      obj[index] = savedIngredients.includes(ingredient);
      return obj;
    }, {});

    setIsCheckedIngredients(defaultCheckedState);
  }, [id, ingredientsList, recipeType]);

  const saveCheckedIngredients = (stateObj) => {
    const usedIngredients = ingredientsList.filter((element, index) => (stateObj[index]));
    const progressRecipesList = {
      ...inProgressRecipes[recipeType],
      [id]: usedIngredients,
    };

    setLocalStorage('inProgressRecipes', {
      ...inProgressRecipes,
      [recipeType]: progressRecipesList,
    });
  };

  const conditional = Object.keys(isCheckedIngredients).length > 0;

  return (
    <section>
      <h3>Ingredientes</h3>
      {
        conditional
        && ingredientsList.map((ingredient, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ `${index}-ingredient` }>
              {ingredient}
              <input
                type="checkbox"
                id={ `${index}-ingredient` }
                name={ `${index}Ingredient` }
                value={ ingredient }
                checked={ isCheckedIngredients[index] }
                onChange={ ({ currentTarget }) => {
                  const obj = { ...isCheckedIngredients, [index]: currentTarget.checked };
                  setIsCheckedIngredients(obj);
                  saveCheckedIngredients(obj);
                } }
              />
              {/* <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="secondary"
                checked={ isCheckedIngredients[index] || false }
                value="1"
                onChange={ ({ currentTarget }) => {
                  setIsCheckedIngredients(
                    { ...isCheckedIngredients, [index]: currentTarget.checked },
                  );
                } }
              >
                Checked
              </ToggleButton> */}
            </label>
          </div>))
      }
    </section>
  );
};

IngredientsCheckList.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientsCheckList;
