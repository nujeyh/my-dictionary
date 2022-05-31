import React from "react";
import styled from "styled-components";
import TypeIt from "typeit-react";

const Header = () => {
  return (
    <HeaderWrap>
      <h1>
        <TypeIt>나만의 사전</TypeIt>
      </h1>
      <hr />
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  text-align: center;
  hr {
    margin: 10px 0 20px 0;
  }
`;

export default Header;
