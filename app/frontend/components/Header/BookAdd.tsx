import { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import styled from 'styled-components';

import BookMenu from "~/components/BookMenu/BookMenu";

export default function BookAdd() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setIsOpen(true)}>
        <RiAddFill className='menu-item' />
      </Wrapper>
      <BookMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
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
