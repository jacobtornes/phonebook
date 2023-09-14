import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Landing from './pages/Landing';
import Phonebook from './pages/Phonebook';

import { AuthContext } from './components/AuthContext';
import Layout from './components/Layout';
import Callback from './components/Callback';

const LayoutWithAuth = () => {
  const { user } = useContext(AuthContext);
  return user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/callback" element={<Callback />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/phonebook" element={<LayoutWithAuth />}>
            <Route index element={<Phonebook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
