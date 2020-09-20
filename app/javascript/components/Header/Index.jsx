import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import BookAdd from './BookAdd';
import Dropdown from './Dropdown';
import BookMenu from '../BookMenu';

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const isMenuItem = element => !element.classList.contains('menu-item');

  const handleMenuClose = () => {
    window.onclick = ({ target }) => {
      if (isMenuItem(target)) setOpenMenu(false);
    }
  }

  useEffect(handleMenuClose, [openMenu]);

  return (
    <Wrapper>
      <BookAdd setOpenMenu={setOpenMenu} />
      <Dropdown />
      {openMenu && (
        <BookMenu />
      )}
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
