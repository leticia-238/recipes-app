import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ Food } />
        <Route exact path="/drinks/:id" component={ Drink } />
        <Route exact path="/foods/:id/in-progress " component={ Foods } />
        <Route exact path="/drinks/:id/in-progress " component={ Foods } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ Foods } />
        <Route exact path="/explore/drinks" component={ Foods } />
        <Route exact path="/explore/foods/ingredients" component={ Foods } />
        <Route exact path="/explore/drinks/ingredients" component={ Foods } />
        <Route exact path="/explore/foods/nationalities" component={ Foods } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ Login } />
        <Route exact path="/favorite-recipes " component={ Login } />
      </Switch>
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
