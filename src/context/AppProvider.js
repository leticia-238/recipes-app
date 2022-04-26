import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const contextValue = {};

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
