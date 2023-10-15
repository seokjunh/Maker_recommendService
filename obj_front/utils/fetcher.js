import Cookies from 'js-cookie';

const fetcher = () => {
  if (Cookies.get('token') && Cookies.get('name') && Cookies.get('userid')) {
    return Cookies.get('userid');
  }

  return null;
};

export default fetcher;
