import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Foods from './pages/Foods';
import './styles/App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/foods/:id" component={ Foods } />
      <Route path="/drinks/:id" component={ Drinks } />
      <Route path="/foods/:id/in-progress " component={ Foods } />
      <Route path="/drinks/:id/in-progress " component={ Drinks } />
      <Route path="/explore" component={ Explore } />
      <Route path="/explore/foods" component={ Explore } />
      <Route path="/explore/drinks" component={ Explore } />
      <Route path="/explore/foods/ingredients" component={ Explore } />
      <Route path="/explore/drinks/ingredients" component={ Explore } />
      <Route path="/explore/foods/nationalities" component={ Explore } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />

      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
    </BrowserRouter>
  );
}

export default App;
