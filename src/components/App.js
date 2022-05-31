import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "../routes/Main";
import UpdateWord from "../routes/UpdateWord";

import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/word/:id" element={<UpdateWord />} />
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
