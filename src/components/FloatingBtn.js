import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";

import { motion } from "framer-motion";

const FloatingBtn = () => {
  const navigate = useNavigate();

  return (
    <FloatingWrap>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <UpIcon />
        </Fab>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("/word/new")}
        >
          <AddIcon />
        </Fab>
      </motion.div>
    </FloatingWrap>
  );
};

const FloatingWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1;
  div {
    margin-bottom: 5px;
  }
`;

export default FloatingBtn;
