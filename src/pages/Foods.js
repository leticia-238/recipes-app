import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Foods = ({ match: { params: { id } } }) => (
  <div>
    { !id && <Header title="Foods" /> }
    <h2>Foods Page</h2>
    { !id && <Footer /> }
  </div>

);

export default Foods;

Foods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
