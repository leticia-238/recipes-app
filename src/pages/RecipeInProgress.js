import React, { useCallback, useContext, useEffect, useState } from 'react';

const RecipeInProgress = () => {
  const { contextValue: { selectedRecipe } } = useContext(AppContext);
  const [renderIngredients, setRenderIngredients] = useState([]);

  const countIngredients = useCallback(() => {
    const temp = [];
    for (let index = 1; index < selectedRecipe.totalOfIngredients + 1; index += 1) {
      temp.push(
        `${selectedRecipe[`strIngredient${index}`]} -
        ${selectedRecipe[`strMeasure${index}`]}`,
      );
    }
    return temp;
  }, [selectedRecipe]);

  useEffect(() => {
    setRenderIngredients(countIngredients());
  }, [countIngredients]);

  return (
    <section className="recipe">
      <img data-testid="recipe-photo" src={ selectedRecipe.image } alt="" />
      <h2 data-testid="recipe-title">{selectedRecipe.name}</h2>
      <p data-testid="recipe-category">
        {selectedRecipe.category}
        {' '}
        {
          selectedRecipe.alcoholic ? selectedRecipe.alcoholic : ''
        }

      </p>
      <div className="recipes-buttons">
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
      </div>

      <section className="recipe-ingredients">
        <h3>Ingredientes</h3>
        {
          renderIngredients.length > 0 && renderIngredients.map((ingredient, index) => (
            <p
              key={ index }
              // data-testid diferente
              data-testid={ `${index}-ingredient-step` }
            >
              {ingredient}
            </p>))
        }

      </section>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </section>
  );
};

export default RecipeInProgress;
