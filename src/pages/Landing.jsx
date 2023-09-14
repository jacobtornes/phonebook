import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="container mx-auto p-6">
      Welcome...this is the landing page...it needs some love
      <p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/login">Log In</Link>
        </button>
      </p>
    </div>
  );
};

export default Landing;
