// Callback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userManager } from '../utils/oidcConfig'; // your OIDC configuration

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    userManager.signinRedirectCallback()
      .then((user) => {
        // Successfully signed in
        // You can access the JWT token via `user.access_token`
        // Redirect to a secure page
        navigate("/phonebook");
      })
      .catch((error) => {
        // Handle errors
        console.error('Problem signing in', error);
      });
  }, [navigate]);

  return (
    <div>Loading...</div>
  );
};

export default Callback;
