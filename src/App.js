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
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinkDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import NotFound from './pages/NotFound';

const App = () => (

  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods/:id" component={ FoodsDetails } />
    <Route exact path="/drinks/:id" component={ DrinksDetails } />
    <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
    <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    <Route
      exact
      path="/explore/foods/ingredients"
      component={ ExploreFoodIngredients }
    />
    <Route
      exact
      path="/explore/drinks/ingredients"
      component={ ExploreDrinksIngredients }
    />
    <Route
      exact
      path="/explore/foods/nationalities"
      component={ ExploreNationalities }
    />
    <Route exact path="/explore/drinks" component={ ExploreDrinks } />
    <Route exact path="/explore/foods" component={ ExploreFoods } />
    <Route exact path="/explore" component={ Explore } />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/done-recipes" component={ DoneRecipes } />
    <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    <Route path="*" component={ NotFound } />
  </Switch>
);

export default App;
