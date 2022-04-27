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
    <div>
      <Header
        title="Profile"
        searchButton={ false }
      />
      <section>
        <p data-testid="profile-email">{ getEmail }</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
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
      <Footer />
    </div>
  );
};

export default Profile;
