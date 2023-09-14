import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext';

const Login = () => {
  const { user, signin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      signin();
    } else {
      navigate('/phonebook');
    }
  }, [user, signin, navigate]);

  return (
    <div>
      Redirecting to login...
    </div>
  );
};

export default Login;