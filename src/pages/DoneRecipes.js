import React, { useContext } from 'react';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import AppContext from '../context/AppContext';
import useCopyLink from '../hooks/useCopyLink';

const DoneRecipes = () => {
  const { doneRecipes } = useContext(AppContext);

  const { isLinkCopied, copyLink } = useCopyLink();

  return (
    <div>
      <Header
        title="Done Recipes"
        searchButton={ false }
      />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        Filter All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Filter Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Filter Drinks
      </button>
      {
        doneRecipes.map((
          { id, category, name, alcoholicOrNot, nationality, type,
            image, doneDate, tags }, index,
        ) => (
          <div key={ id }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { type === 'food' ? `${nationality} - ${category}` : `${alcoholicOrNot}` }
            </p>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
            <p>{alcoholicOrNot}</p>
            <input
              type="image"
              src={ ShareIcon }
              alt="Share Recipe"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => { copyLink(type, id); } }
            />
            {tags.map((tagName, tagIndex) => (
              <p
                key={ tagIndex }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </p>
            ))}
          </div>))
      }
      { isLinkCopied && <span>Link copied!</span> }
    </div>
  );
};

export default DoneRecipes;
