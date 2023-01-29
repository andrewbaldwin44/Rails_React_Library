import styled from 'styled-components';
import { RiAddFill } from 'react-icons/ri';

interface IBookAdd {
  setOpenMenu: (isMenuOpen: boolean) => void;
}

function BookAdd({ setOpenMenu }: IBookAdd) {
  return (
    <Wrapper onClick={() => setOpenMenu(true)}>
      <RiAddFill className='menu-item' />
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-weight: bold;
  font-size: 1.6em;
  background-color: var(--light-green);
  box-shadow: 0px 0px 10px 1px black;
`;

export default BookAdd;
