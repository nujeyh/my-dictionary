import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteDictFB, completeDictFB } from "../redux/modules/dictionary";

import IconButton from "@mui/material/IconButton";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const Word = ({ wordObj }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // 단어 삭제하기
  const onClickDelete = () => {
    dispatch(deleteDictFB(wordObj.id));
  };

  const onClickComplete = () => {
    dispatch(completeDictFB(wordObj));
  };

  return (
    <WordCard completed={wordObj.completed}>
      <h2>{wordObj.word}</h2>
      <p>{wordObj.meaning}</p>
      <p style={{ color: "#037dd4", marginBottom: "-15px" }}>
        {wordObj.example}
      </p>
      <p style={{ color: "#037dd4" }}>{wordObj.translation}</p>

      <BtnContainer>
        <IconButton sx={{ m: "-3px" }} onClick={onClickComplete}>
          {wordObj.completed ? (
            <CheckCircleRoundedIcon color="primary" />
          ) : (
            <CheckCircleOutlineRoundedIcon />
          )}
        </IconButton>

        {/* 수정하기 버튼
        클릭 시 수정 페이지로 이동되며, 아래 속성도 넘겨줌 */}
        <IconButton
          sx={{ m: "-3px" }}
          color="primary"
          onClick={() =>
            navigate("/word/" + wordObj.id, {
              state: {
                word: wordObj.word,
                meaning: wordObj.meaning,
                example: wordObj.example,
                translation: wordObj.translation,
              },
            })
          }
        >
          <BorderColorRoundedIcon />
        </IconButton>

        <IconButton sx={{ m: "-3px" }} onClick={onClickDelete}>
          <DeleteForeverRoundedIcon />
        </IconButton>
      </BtnContainer>
    </WordCard>
  );
};
const WordCard = styled.div`
  min-width: 280px;
  width: calc(40% - 10px);
  margin: 20px auto 0 auto;
  padding: 0.5px 20px 0 20px;

  order: ${(prop) => (prop.completed ? 1 : 0)};

  background-color: ${(prop) => (prop.completed ? "#a6d1ff" : "#f5faff")};
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  position: relative;
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 22px;
  right: 10px;
`;
export default Word;
