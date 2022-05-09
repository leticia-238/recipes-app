import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ButtonShare from './ButtonShare';
import ButtonFavorite from './ButtonFavorite';

const RecipesList = ({ recipes }) => {
  const history = useHistory();

  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    setRecipesList(recipes);
  }, [recipes]);

  const filterRecipes = (type) => {
    setRecipesList(recipes.filter((recipe) => (recipe.type === type)));
  };

  const redirectToFoodsDetails = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => { setRecipesList(recipes); } }
      >
        Filter All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => { filterRecipes('food'); } }
      >
        Filter Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => { filterRecipes('drink'); } }
      >
        Filter Drinks
      </button>
      { recipesList.length > 0
        && recipesList.map((recipe, index) => {
          const { id, category, name, alcoholicOrNot, nationality, type, image,
            doneDate, tags } = recipe;
          return (
            <Card style={ { width: '18rem' } } key={ id }>
              <Card.Img
                variant="top"
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => { redirectToFoodsDetails(type, id); } }
              />
              <Card.Body>
                <Card.Title data-testid={ `${index}-horizontal-top-text` }>
                  { type === 'food'
                    ? `${nationality} - ${category}` : `${alcoholicOrNot}` }
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  data-testid={ `${index}-horizontal-name` }
                  onClick={ () => { redirectToFoodsDetails(type, id); } }
                >
                  {name}
                </Card.Subtitle>
                { doneDate && (
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {doneDate}
                  </p>
                )}
                <p>{alcoholicOrNot}</p>
                {tags && (
                  tags.map((tagName, tagIndex) => (
                    <p
                      key={ tagIndex }
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      {tagName}
                    </p>))
                )}
                <ButtonShare
                  testid={ `${index}-horizontal-share-btn` }
                  url={ `http://localhost:3000/${type}s/${id}` }
                />
                {!doneDate && <ButtonFavorite
                  testid={ `${index}-horizontal-favorite-btn` }
                  selectedRecipe={ recipe }
                  defaultState
                />}
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RecipesList;
