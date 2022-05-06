import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

const ButtonShare = ({ testid, url }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const copyLink = () => {
    setIsLinkCopied(true);
    copy(url);
    const messageTime = 5000;
    setInterval(() => {
      setIsLinkCopied(false);
    }, messageTime);
  };

  return (
    <div>
      <input
        type="image"
        src={ ShareIcon }
        alt="Share Recipe"
        data-testid={ testid }
        onClick={ () => { copyLink(); } }
      />
      { isLinkCopied && <span>Link copied!</span> }
    </div>
  );
};

ButtonShare.propTypes = {
  testid: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ButtonShare;
