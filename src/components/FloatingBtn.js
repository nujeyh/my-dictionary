import React from "react";
import { Link } from "react-router-dom";

const FloatingBtn = () => {
  return (
    <>
      <Link to="/word/new">
        <button>새 단어</button>
      </Link>
    </>
  );
};

export default FloatingBtn;
