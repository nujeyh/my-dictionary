import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteDictFB } from "../redux/modules/dictionary";

const Word = ({ wordObj }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onDeleteClick = () => {
    dispatch(deleteDictFB(wordObj.id));
  };

  return (
    <>
      <div style={{ backgroundColor: "orange" }}>
        <p>{wordObj.word}</p>
        <p>{wordObj.meaning}</p>
        <p>{wordObj.example}</p>
        <p>{wordObj.translation}</p>
        <button
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
          수정
        </button>
        <button onClick={onDeleteClick}>삭제</button>
      </div>
    </>
  );
};

export default Word;
