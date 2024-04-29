/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EditContact = ({ contact }: { contact: any }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    status: "Inactive",
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    } else {
      const existingContacts = JSON.parse(
        localStorage.getItem("contacts") || "[]"
      );
      contact = existingContacts.find((contact: any) => contact.id === id);
    }
  }, [contact]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const existingContacts = JSON.parse(
      localStorage.getItem("contacts") || "[]"
    );
    const updatedContacts = existingContacts.map((existingContact: any) => {
      if (existingContact.id === id) {
        return formData;
      }
      return existingContact;
    });

    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="w-full h-16 bg-blue-700 text-white py-4 place-items-center">
        <div className="text-center font-bold text-xl">Contact Page</div>
      </div>
      <div className="text-center font-bold text-2xl mt-5">Edit Contact</div>
      <form
        className="max-w-md mx-auto mt-5 border-black p-10 border-2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            First Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Last Name
          </label>
        </div>
        <div className="flex flex-raw">
          <div className="mt-8 mr-5">Status:</div>
          <div>
            <div className="flex items-center ps-4 rounded dark:border-gray-700">
              <input
                type="radio"
                value="Active"
                name="status"
                checked={formData.status === "Active"}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Active
              </label>
            </div>
            <div className="flex items-center ps-4 border-gray-200 rounded dark:border-gray-700">
              <input
                type="radio"
                value="Inactive"
                name="status"
                checked={formData.status === "Inactive"}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Inactive
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save Edited Contact
        </button>
      </form>
    </div>
  );
};
