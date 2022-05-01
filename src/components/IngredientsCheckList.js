import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

const defaultData = { meals: {}, cocktails: {} };
const inProgressRecipes = getLocalStorage('inProgressRecipes') || defaultData;

const IngredientsCheckList = () => {
  const { selectedRecipe: { ingredientsList, type, id } } = useContext(AppContext);

  const [isCheckedIngredients, setIsCheckedIngredients] = useState({});

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
  }, [id, ingredientsList, type]);

  const saveCheckedIngredients = (stateObj) => {
    const usedIngredients = ingredientsList.filter((element, index) => (stateObj[index]));
    const progressRecipesList = {
      ...inProgressRecipes[type],
      [id]: usedIngredients,
    };

    setLocalStorage('inProgressRecipes', {
      ...inProgressRecipes,
      [type]: progressRecipesList,
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
            <ToggleButton
              id={ `${index}-ingredient` }
              type="checkbox"
              variant="secondary"
              checked={ isCheckedIngredients[index] }
              value={ ingredient }
              onChange={ ({ currentTarget }) => {
                const obj = { ...isCheckedIngredients, [index]: currentTarget.checked };
                setIsCheckedIngredients(obj);
                saveCheckedIngredients(obj);
              } }
            >
              Checked
            </ToggleButton>
          </div>))
      }
    </section>
  );
};

export default IngredientsCheckList;
