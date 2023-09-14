import React, { useState } from 'react';
import { createContact, updateContact } from '../api';

const ContactForm = ({ existingContact, onContactChanged }) => {
  const [contact, setContact] = useState(existingContact || { name: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedContact;
    if (contact.id) {
      updatedContact = await updateContact(contact.id, contact);
    } else {
      updatedContact = await createContact(contact);
    }
    onContactChanged(updatedContact);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name: </label>
        <input type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="border p-2" />
      </div>
      <div>
        <label>Phone: </label>
        <input type="text" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="border p-2" />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default ContactForm;
