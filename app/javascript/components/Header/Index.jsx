import React, { useContext } from 'react';
import styled from "styled-components";

import BookAdd from './BookAdd';
import Dropdown from './Dropdown';

function Header() {
  return (
    <Wrapper>
      <BookAdd />
      <Dropdown />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  right: 80px;
  top: 40px;
`;

export default Header;
