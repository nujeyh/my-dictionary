import React, { useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createDictFB, updateDictFB } from "../redux/modules/dictionary";

const UpdateWord = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const word = useRef("");
  const meaning = useRef("");
  const example = useRef("");
  const translation = useRef("");

  const wordId = useParams();
  // const isLoaded = useSelector((state) => state.dictionary.isLoaded);

  const isBlank = () => {
    if (
      !(
        word.current.value &&
        meaning.current.value &&
        example.current.value &&
        translation.current.value
      )
    ) {
      window.alert("입력안한거있음");
      return true;
    }
  };

  const createDict = () => {
    if (isBlank() === true) return;
    dispatch(
      createDictFB({
        word: word.current.value,
        meaning: meaning.current.value,
        example: example.current.value,
        translation: translation.current.value,
      })
    );

    navigate("/");
  };

  const updateDict = () => {
    if (isBlank() === true) return;

    dispatch(
      updateDictFB({
        id: wordId.id,
        word: word.current.value,
        meaning: meaning.current.value,
        example: example.current.value,
        translation: translation.current.value,
      })
    );

    navigate("/");
  };

  return (
    <div>
      <h2>{wordId.id === "new" ? "새로운 단어 만들기" : "단어 수정하기"}</h2>
      <div>
        <span>단어</span>
        <input
          ref={word}
          type="text"
          defaultValue={wordId.id === "new" ? "" : location.state.word}
        />
      </div>
      <div>
        <span>의미</span>
        <input
          ref={meaning}
          type="text"
          defaultValue={wordId.id === "new" ? "" : location.state.meaning}
        />
      </div>
      <div>
        <span>예문</span>
        <input
          ref={example}
          type="text"
          defaultValue={wordId.id === "new" ? "" : location.state.example}
        />
      </div>
      <div>
        <span>해석</span>
        <input
          ref={translation}
          type="text"
          defaultValue={wordId.id === "new" ? "" : location.state.translation}
        />
      </div>

      {wordId.id === "new" ? (
        <button onClick={createDict}>추가하기</button>
      ) : (
        <button onClick={updateDict}>수정하기</button>
      )}

      <button onClick={() => navigate("/")}>뒤로가기</button>
    </div>
  );
};

export default UpdateWord;
