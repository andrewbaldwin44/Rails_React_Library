import styled from "styled-components";

import BookAdd from "~/components/Header/BookAdd";
import Dropdown from "~/components/Header/Dropdown";

function Header() {

  return (
    <Wrapper>
      <BookAdd />
      <Dropdown />
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
