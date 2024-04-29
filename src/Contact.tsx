/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Contact = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const navigate = useNavigate();
  const getContactsFromLocalStorage = () => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  };

  useEffect(() => {
    getContactsFromLocalStorage();
  }, []);

  const handleUpdateContact = (id: string) => {
    navigate(`edit/${id}`);
  };

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <div className="w-full">
      <div className="w-full h-16 bg-blue-700 text-white py-4 place-items-center">
        <div className="text-center font-bold text-xl">Contact Page</div>
      </div>
      <div className="text-center my-4">
        <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <NavLink to="create">Create Contact</NavLink>
          </span>
        </button>
      </div>
      <div
        className="max-w-md mx-auto mt-5 flex-grow overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="text-center font-bold text-2xl my-5">All Contacts</div>
        {contacts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div
                  key={contact.id}
                  className="border-b border-gray-300 py-3 justify-between items-center"
                >
                  <div className="">
                    <div className="text-base">
                      <div className="m-1 text-black dark:text-white">
                        <b>First Name:</b> {contact.firstName}
                      </div>
                      <div className="m-1 text-black dark:text-white">
                        <b>Last Name:</b> {contact.lastName}
                      </div>
                      <div className="m-1 mb-2 text-black dark:text-white">
                        <b>Status:</b> {contact.status}
                      </div>
                    </div>
                    <div className="lg:flex lg:flex-row">
                      <button
                        type="button"
                        onClick={() => handleUpdateContact(contact.id)}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            No contacts found. Add contacts from the Create Contact page.
          </div>
        )}
      </div>
    </div>
  );
};
