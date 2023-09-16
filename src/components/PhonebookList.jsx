import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { getContacts, deleteContact } from "../api";
import SearchInput from "./Search/SearchInput";
import AddContact from "./Contact/AddContact";
import { TrashIcon } from "@heroicons/react/24/solid";

const PhonebookList = ({ onSelectContact }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(null);
  const [filter, setFilter] = useState("");
  const [showConfetti, setShowConfetti] = useState(false); // New state for confetti

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
  }, [filter, refresh]);

  const handleDelete = async (id) => {
    await deleteContact(id);
    setRefresh(new Date().getTime());
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {showConfetti && <Confetti />}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Contact
          </button>
        </div>
        <AddContact
          open={isModalOpen}
          setOpen={setModalOpen}
          onContactAdded={() => {
            setShowConfetti(true); // Trigger confetti

            // Hide confetti after 2 seconds
            setTimeout(() => {
              setShowConfetti(false);
            }, 4000);
            setRefresh(new Date().getTime());
          }}
        />
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Phone
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact, index) => (
                  <tr key={index + contact.ID}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {contact?.Info?.Name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {contact?.Info?.DefaultEmail.EmailAddress}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {contact?.Info?.DefaultPhone.Number}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                        <span className="sr-only">, {contact?.Info?.Name}</span>
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleDelete(contact.ID)}
                        type="button"
                        className="rounded-full p-1.5 text-gray-400 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonebookList;
