import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import { loadDictFB } from "../redux/modules/dictionary";
import FloatingBtn from "../components/FloatingBtn";
import Word from "../components/Word";

const Main = () => {
  const dispatch = useDispatch();

  //  const observer = new IntersectionObserver();

  useEffect(() => {
    dispatch(loadDictFB());
  }, []);
  const dictList = useSelector((state) => state.dictionary.list);
  return (
    <>
      <FloatingBtn />
      <div>
        {dictList[0] === undefined
          ? "로딩 중"
          : dictList.map((word) => {
              return <Word key={word.id} wordObj={word} />;
            })}
        <div></div>
      </div>
    </>
  );
};

export default Main;
