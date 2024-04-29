import React, { useState } from "react";
import { Routes, Route, Switch } from "react-router-dom";
import { Contact } from "./Contact";
import Sidebar from "./Sidebar";
import Charts from "./Charts";
import { CreateContact } from "./CreateContact";
import { EditContact } from "./EditContact";

const App: React.FC = () => {
  return (
    <div className="lg:flex lg:flex-row h-screen">
      {/* Sidebar (visible only on phone screens) */}
      <div className="lg:w-60 lg:h-screen w-full h-60 bg-gray-200">
        <Sidebar />
      </div>
      {/* Content (visible only on large screens) */}
      <div className="lg:flex-grow overflow-y-auto">
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
