import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const Drinks = ({ match: { params: { id } } }) => (
  <div>
    { !id && <Header title="Drinks" /> }
    <h2>Foods Page</h2>
  </div>
);

export default Drinks;
Drinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
