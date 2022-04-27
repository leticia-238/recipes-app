import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreNationalities from './pages/ExploreNationalities';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:id" component={ Foods } />
      <Route path="/drinks/:id" component={ Drinks } />
      <Route path="/foods/:id/in-progress " component={ Foods } />
      <Route path="/drinks/:id/in-progress " component={ Drinks } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/explore/foods/ingredients" component={ ExploreFoodIngredients } />
      <Route
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksIngredients }
      />
      <Route
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods" component={ ExploreFoods } />
      <Route path="/explore" component={ Explore } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
