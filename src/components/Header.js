import React from "react";
import styled from "styled-components";
import TypeIt from "typeit-react";

const Header = () => {
  return (
    <HeaderWrap>
      <h1>
        <TypeIt
          options={{ speed: 200 }}
          getBeforeInit={(instance) => {
            instance
              .type("나만의 사전")
              .pause(3000)
              .delete(2)
              .pause(2000)
              .type("Dictionary")
              .pause(3000)
              .delete(10)
              .pause(2000)
              .type("辭典")
              .pause(3000)
              .delete(2)
              .pause(2000)
              .type("vorweg")
              .pause(3000)
              .delete(6)
              .pause(2000)
              .type("사전");

            return instance;
          }}
        />
      </h1>
      <hr />
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  text-align: center;
`;

export default Header;
