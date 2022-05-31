import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteDictFB } from "../redux/modules/dictionary";

import IconButton from "@mui/material/IconButton";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const Word = ({ wordObj }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // 단어 삭제하기
  const onClickDelete = () => {
    dispatch(deleteDictFB(wordObj.id));
  };

  return (
    <WordCard>
      <h2>{wordObj.word}</h2>
      <p>{wordObj.meaning}</p>
      <p style={{ color: "#037dd4", marginBottom: "-15px" }}>
        {wordObj.example}
      </p>
      <p style={{ color: "#037dd4" }}>{wordObj.translation}</p>
      <BtnContainer>
        {/* 수정하기 버튼
        클릭 시 수정 페이지로 이동되며, 아래 속성도 넘겨줌 */}
        <IconButton
          aria-label="delete"
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

        <IconButton aria-label="delete" onClick={onClickDelete}>
          <DeleteForeverRoundedIcon />
        </IconButton>
      </BtnContainer>
    </WordCard>
  );
};
const WordCard = styled.div`
  min-width: 280px;
  width: calc(40% - 10px);
  margin: 0 auto 20px auto;
  padding: 0.5px 20px 0 20px;

  background-color: #f5faff;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  position: relative;
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 17px;
  right: 10px;
`;
export default Word;
