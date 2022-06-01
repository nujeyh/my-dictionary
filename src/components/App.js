import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Main from "../routes/Main";
import UpdateWord from "../routes/UpdateWord";
import Footer from "./Footer";

import Header from "./Header";

function App() {
  return (
    <AppWrap>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/word/:id" element={<UpdateWord />} />
        <Route path="*" element={<h2>⛔️ !잘못된 주소에요! ⛔️</h2>} />
      </Routes>
      <Footer />
    </AppWrap>
  );
}

const AppWrap = styled.div`
  font-family: "Noto Serif KR", serif;
`;

export default App;
