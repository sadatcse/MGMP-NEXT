

import { useEffect } from 'react';
import Spinner from './../components/Utility/Spinner';

const RedirectToShopify = () => {
  useEffect(() => {
    window.location.href = 'https://accounts.shopify.com/store-login';
  }, []);

  return (
    <div>
      <Spinner />
    </div>
  );
};
export default RedirectToShopify;