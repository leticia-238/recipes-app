import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import AppProvider from '../../context/AppProvider';

const renderWithRouterAndContext = (component, options) => {
  const history = createMemoryHistory(options);

  return ({
    ...render(
      <AppProvider>
        <Router history={ history }>{component}</Router>
      </AppProvider>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
