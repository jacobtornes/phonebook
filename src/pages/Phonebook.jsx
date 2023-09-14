import React from 'react';
import { Link } from 'react-router-dom';
import PhonebookList from '../components/PhonebookList';

const Phonebook = () => {
  return (
    <div className="container mx-auto p-6">
      <PhonebookList/>
    </div>
  );
};

export default Phonebook;
