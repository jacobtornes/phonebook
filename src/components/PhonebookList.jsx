import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../api';
import SearchInput from './Search/SearchInput';

const PhonebookList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const handleSearch = (query) => {
      setFilter(query);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContacts(filter);
        setContacts(data);
      } catch (error) {
        console.log("Unable to fetch contacts data");
      }
    };
    fetchData();
  }, [filter]);

  const handleDelete = async (id) => {
    await deleteContact(id);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <SearchInput onSearch={handleSearch}/>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Contact
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.ID}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact?.Info?.Name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact?.Info?.DefaultEmail.EmailAddress}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact?.Info?.DefaultPhone.Number}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {contact?.Info?.Name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PhonebookList;
