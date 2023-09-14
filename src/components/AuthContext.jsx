import React, { createContext, useState, useEffect, useContext } from 'react';
import { userManager } from '../utils/oidcConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = () => {
    userManager.signinRedirect();
  };

  const signout = () => {
    userManager.signoutRedirect();
  };

  useEffect(() => {
    userManager.getUser().then((currentUser) => {
      if (currentUser) {
        console.log('access_token', currentUser.access_token);
        console.log('id_token', currentUser.id_token);
        setUser(currentUser);
      }
    });

    userManager.events.addUserLoaded((loadedUser) => {
      setUser(loadedUser);
    });

    userManager.events.addUserUnloaded(() => {
      setUser(null);
    });

    return () => {
      userManager.events.removeUserLoaded();
      userManager.events.removeUserUnloaded();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
