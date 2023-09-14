import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';

const Logout = () => {
  const { setUser, signout } = useContext(AuthContext);

  useEffect(() => {
    signout();
    setUser(null);
  }, [setUser, signout]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;