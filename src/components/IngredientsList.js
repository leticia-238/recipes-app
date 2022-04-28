import React, { useState } from 'react';

const IngredientsList = () => {
  const { contextValue: { selectedRecipe } } = useContext(AppContext);

  const [renderIngredients, setRenderIngredients] = useState([]);

  const countIngredients = useCallback(() => {
    const temp = [];
    for (let index = 1; index < selectedRecipe.totalOfIngredients + 1; index += 1) {
      temp.push(
        `${
          selectedRecipe[`strIngredient${index}`]} -
          ${selectedRecipe[`strMeasure${index}`]}`,
      );
    }
    return temp;
  }, [selectedRecipe]);
  useEffect(() => {
    setRenderIngredients(countIngredients());
  }, [countIngredients]);

  return (
    <section className="recipe-ingredients">
      <h3>Ingredientes</h3>
      {
        renderIngredients.length > 0 && renderIngredients.map((ingredient, index) => (
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
