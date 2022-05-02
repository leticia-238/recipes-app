import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import AppContext from '../context/AppContext';

const IngredientsCheckList = () => {
  const { selectedRecipe, inProgressRecipes, setInProgressRecipes,
    doneRecipes, setDoneRecipes } = useContext(AppContext);

  const { ingredientsList, type, id } = selectedRecipe;
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
  }, [id, ingredientsList, type, inProgressRecipes]);

  const saveCheckedIngredients = (stateObj) => {
    const usedIngredients = ingredientsList.filter((elm, index) => (stateObj[index]));
    const progressRecipesList = { ...inProgressRecipes[type], [id]: usedIngredients };

    setInProgressRecipes({ ...inProgressRecipes, [type]: progressRecipesList });
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
                if (!(Object.values(obj).includes(false))) {
                  setDoneRecipes([...doneRecipes, selectedRecipe]);
                } else {
                  setDoneRecipes(doneRecipes.filter((recipe) => (recipe.id !== id)));
                }
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
