import { useState, useEffect } from 'react';
import styled from 'styled-components';

import BookAdd from './BookAdd';
import Dropdown from './Dropdown';
import BookMenu from '../BookMenu/BookMenuContainer';

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const isMenuOverlay = element => element.classList.contains('menu-overlay');

  const handleMenuClose = () => {
    window.onclick = ({ target }) => {
      if (isMenuOverlay(target)) setOpenMenu(false);
    };
  };

  useEffect(handleMenuClose, [openMenu]);

  return (
    <Wrapper>
      <BookAdd setOpenMenu={setOpenMenu} />
      <Dropdown />
      <BookMenu openMenu={openMenu} />
    </Wrapper>
  );
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
