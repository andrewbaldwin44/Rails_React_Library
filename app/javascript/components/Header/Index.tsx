import { useState, useEffect } from 'react';
import styled from 'styled-components';

import BookAdd from 'components/Header/BookAdd';
import Dropdown from 'components/Header/Dropdown';
import BookMenu from 'components/BookMenu/BookMenuContainer';

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const isMenuOverlay = (element: HTMLElement) => element.classList.contains('menu-overlay');

  const handleMenuClose = () => {
    window.onclick = ({ target }) => {
      if (isMenuOverlay(target as HTMLElement)) setOpenMenu(false);
    };
  };

  useEffect(handleMenuClose, [openMenu]);

  return (
    <Wrapper>
      <BookAdd setOpenMenu={setOpenMenu} />
      <Dropdown />
      {openMenu && <BookMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />}
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
