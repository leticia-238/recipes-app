import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import ButtonShare from './ButtonShare';

const RecipesList = () => {
  const { doneRecipes } = useContext(AppContext);

  const history = useHistory();

  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    if (doneRecipes.length > 0) {
      setRecipesList(doneRecipes);
    }
  }, [doneRecipes]);

  const filterRecipes = (type) => {
    setRecipesList(doneRecipes.filter((recipe) => (recipe.type === type)));
  };

  const redirectToFoodsDetails = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => { setRecipesList(doneRecipes); } }
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
        && recipesList.map((
          { id, category, name, alcoholicOrNot, nationality, type,
            image, doneDate, tags }, index,
        ) => (
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
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
              <p>{alcoholicOrNot}</p>
              {tags.map((tagName, tagIndex) => (
                <p
                  key={ tagIndex }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  {tagName}
                </p>
              ))}
              <ButtonShare
                testid={ `${index}-horizontal-share-btn` }
                url={ `http://localhost:3000/${type}s/${id}` }
              />
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default RecipesList;
