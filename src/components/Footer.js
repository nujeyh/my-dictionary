import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrap>
      <hr />
      <p>&copy; {new Date().getFullYear()} 🌈 Hyejun.</p>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  margin: 30px 0;
`;

export default Footer;
