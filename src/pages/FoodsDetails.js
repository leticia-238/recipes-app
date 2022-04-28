import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Recipe from '../components/Recipe';

import AppContext from '../context/AppContext';

const FoodsDetails = ({ match: { params: { id } } }) => {
  const { contextValue: { setMealsAndDrinks } } = useContext(AppContext);

  useEffect(() => {
    setMealsAndDrinks('meals', id);
  }, [id, setMealsAndDrinks]);
  return (
    <div>
      <Recipe />
      <h1>Foods Details</h1>
      <section className="recipe-video">
        <video data-testid="video" width="400" height="400" src="">
          <track kind="captions" />
        </video>
      </section>
    </div>);
};

export default FoodsDetails;

FoodsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
