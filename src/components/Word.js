import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteDictFB, completeDictFB } from "../redux/modules/dictionary";

import IconButton from "@mui/material/IconButton";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

// 단어 카드 컴포넌트
const Word = ({ wordObj }) => {
  // CSS용 state
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 단어 삭제하기
  const onClickDelete = () => {
    setDeleted(true);
    setTimeout(() => dispatch(deleteDictFB(wordObj.id)), 300);
  };

  // 완료 상태 바꾸기
  const onClickComplete = () => {
    dispatch(completeDictFB(wordObj));
  };

  // 단어 작성일 만들기
  const milliSeconds = wordObj.createdAt.toDate();
  const day = milliSeconds.getDate();
  const month = milliSeconds.getMonth() + 1;
  const year = milliSeconds.getFullYear();

  return (
    <WordCard completed={wordObj.completed} deleted={deleted}>
      <h2>{wordObj.word}</h2> {/* 단어 */}
      <p>{wordObj.meaning}</p> {/* 의미 */}
      <p className="exText" style={{ marginBottom: "-10px" }}>
        {wordObj.example} {/* 예문 */}
      </p>
      <p className="exText" style={{ marginBottom: "30px" }}>
        {wordObj.translation} {/* 해석 */}
      </p>
      <p className="date">{`${year}.${month}.${day}`}</p> {/* 작성일 */}
      {/* 완료 버튼 */}
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
  width: 90%;
  margin: 0 auto;
  padding: 0.5px 17px 10px 17px;

  /* order: ${(prop) => (prop.completed ? 1 : 0)}; */

  opacity: ${(props) => (props.deleted ? 0 : 1)};

  background-color: ${(props) => (props.completed ? "#a6d1ff" : "#f5faff")};
  border-radius: 10px;
  transition: background-color 0.5s, box-shadow 0.5s, opacity 0.5s;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

  position: relative;

  .exText {
    color: #037dd4;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }

  .date {
    font-size: small;
    color: #7b7b7b;
    position: absolute;
    bottom: 0px;
    right: 20px;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 13px;
  right: 10px;
`;
export default Word;
