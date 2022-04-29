import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const IngredientsCheckList = () => {
  const { ingredientsList } = useContext(AppContext);
  return (
    <section>
      <h3>Ingredientes</h3>
      {
        ingredientsList.length > 0 && ingredientsList.map((ingredient, index) => (
          <div key={ index } data-testid="ingredient-step">
            <input type="checkbox" name="" id="" />
            <p>
              {ingredient}
            </p>
          </div>
        ))
      }
    </section>
  );
};

export default IngredientsCheckList;
