import React, { useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

  const isBlank = () => {
    if (
      !(
        word.current.value &&
        meaning.current.value &&
        example.current.value &&
        translation.current.value
      )
    ) {
      console.log(
        word.current.value,
        meaning.current.value,
        example.current.value,
        translation.current.value
      );
      window.alert("입력하지 않은 항목이 있어요😢");
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

    setTimeout(() => navigate("/"), 1000);
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

  // 파라미터에 따라 다른 컴포넌트 노출
  return (
    <>
      <Container>
        <h2>{wordId.id === "new" ? "새로운 단어 만들기" : "단어 수정하기"}</h2>
        <div>
          <TextField
            fullWidth
            autoComplete="off"
            id="outlined-basic"
            label="단어"
            variant="outlined"
            inputRef={word}
            type="text"
            defaultValue={wordId.id === "new" ? "" : location.state.word}
          />
        </div>
        <div>
          <TextField
            fullWidth
            autoComplete="off"
            id="outlined-basic"
            label="뜻"
            variant="outlined"
            inputRef={meaning}
            type="text"
            defaultValue={wordId.id === "new" ? "" : location.state.meaning}
          />
        </div>
        <div>
          <TextField
            multiline
            rows={3}
            fullWidth
            autoComplete="off"
            id="outlined-basic"
            label="예문"
            variant="outlined"
            inputRef={example}
            type="text"
            defaultValue={wordId.id === "new" ? "" : location.state.example}
          />
        </div>
        <div>
          <TextField
            multiline
            rows={3}
            fullWidth
            autoComplete="off"
            id="outlined-basic"
            label="해석"
            variant="outlined"
            inputRef={translation}
            type="text"
            defaultValue={wordId.id === "new" ? "" : location.state.translation}
          />
        </div>
      </Container>
      <BtnContainer>
        {wordId.id === "new" ? (
          <Button variant="contained" onClick={createDict}>
            추가하기
          </Button>
        ) : (
          <Button variant="contained" onClick={updateDict}>
            수정하기
          </Button>
        )}
        <Button variant="outlined" onClick={() => navigate("/")}>
          뒤로가기
        </Button>
      </BtnContainer>
    </>
  );
};

const Container = styled.div`
  width: 45%;
  min-width: 350px;
  height: 480px;
  margin: auto;

  text-align: center;
  display: flex;
  flex-flow: column;
  /* align-items: center; */
  justify-content: space-around;
`;
const BtnContainer = styled.div`
  width: 400px;
  margin: auto;
  text-align: center;

  button {
    margin: 10px 5px;
  }
`;
export default UpdateWord;
