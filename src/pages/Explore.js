import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explore = () => {
  const history = useHistory();

  return (
    <div>
      <Header
        title="Explore"
        searchButton={ false }
      />
      <section>
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Explore;
