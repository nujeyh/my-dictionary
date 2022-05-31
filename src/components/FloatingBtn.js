import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";

const FloatingBtn = () => {
  const navigate = useNavigate();

  return (
    <FloatingWrap>
      <div>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <UpIcon />
        </Fab>
      </div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate("/word/new")}
      >
        <AddIcon />
      </Fab>
    </FloatingWrap>
  );
};

const FloatingWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
  right: 10px;
  div {
    margin-bottom: 5px;
  }
`;

export default FloatingBtn;
