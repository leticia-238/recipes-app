import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const IngredientsList = () => {
  const { selectedRecipe: { ingredientsList } } = useContext(AppContext);
  return (
    <section className="recipe-ingredients mb-4 p-4">
      <h3 className="pb-2">Ingredientes</h3>
      {
        ingredientsList.length > 0 && ingredientsList.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </p>))
      }

    </section>
  );
};

export default IngredientsList;
