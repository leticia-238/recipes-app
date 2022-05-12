import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getLocalStorage } from '../utils/localStorage';

const Profile = () => {
  const [getEmail, setGetEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getEmailStorage = getLocalStorage('user');
    if (getEmailStorage) {
      setGetEmail(getEmailStorage.email);
    }
  }, []);

  return (
    <>
      <Header
        title="Profile"
        searchButton={ false }
      />
      <div className="container">

        <section
          style={ {
            width: '100%',
            height: '90vh',
            gap: '16px',
          } }
          className="px-4 d-flex flex-column  justify-content-start"
        >
          <p data-testid="profile-email">{ getEmail }</p>
          <button
            style={ {
              fontSize: '24px',
            } }
            className="button-filter"
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            style={ {
              fontSize: '24px',
            } }
            className="button-filter"
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            style={ {
              fontSize: '24px',
            } }
            className="button-filter"
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Logout
          </button>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Profile;
