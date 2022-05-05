import { useCallback, useState } from 'react';
import copy from 'clipboard-copy';

const useCopyLink = () => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const copyLink = useCallback((type, id) => {
    const recipeType = type ? 'foods' : 'drinks';

    setIsLinkCopied(true);
    copy(`http://localhost:3000/${recipeType}/${id}`);
    const messageTime = 5000;
    setInterval(() => {
      setIsLinkCopied(false);
    }, messageTime);
  }, []);

  return { isLinkCopied, copyLink };
};

export default useCopyLink;
