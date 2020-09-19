import React, { useContext } from 'react';
import styled from "styled-components";

import { AuthenticationContext } from '../AuthenticationContext';
import Dropdown from './Dropdown';

function Header() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  return (
    <Wrapper>
    {userData && Object.keys(userData).length > 0 && (
      <Dropdown />
    )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  right: 80px;
  top: 40px;
`;

export default Header;
