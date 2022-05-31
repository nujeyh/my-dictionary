import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TypeIt from "typeit-react";

import { loadDictFB } from "../redux/modules/dictionary";
import FloatingBtn from "../components/FloatingBtn";
import Word from "../components/Word";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDictFB());
  }, []);

  const dictList = useSelector((state) => state.dictionary.list);
  return (
    <>
      <FloatingBtn />
      <MainContainer>
        {dictList[0] === undefined ? (
          <h1>
            <TypeIt>로딩 중......</TypeIt>
          </h1>
        ) : (
          dictList.map((word) => {
            return <Word key={word.id} wordObj={word} />;
          })
        )}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  width: calc(90% - 10px);
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

export default Main;
