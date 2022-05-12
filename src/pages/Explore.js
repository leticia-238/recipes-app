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
      <section
        style={ { gap: '16px', height: '100vh' } }
        className="container d-flex flex-column justify-content-center"
      >
        <button
          style={ { fontSize: '24px' } }
          className="button-filter"
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          style={ { fontSize: '24px' } }
          className="button-filter"
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
