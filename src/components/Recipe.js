import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Recipe = () => {
  const { contextValue: { selectedRecipe } } = useContext(AppContext);

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

      <section className="recipe-instructions">
        <h3>Como Preparar</h3>
        <p data-testid="instructions">{selectedRecipe.instructions}</p>
      </section>
    </section>);
};

export default Recipe;
