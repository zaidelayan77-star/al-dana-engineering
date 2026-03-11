import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Top = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default Top;
