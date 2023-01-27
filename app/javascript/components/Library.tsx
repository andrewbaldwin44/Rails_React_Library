import styled from 'styled-components';

import Header from 'components/Header/Index';
import { SHELVES } from '../constants';
import Shelf from 'components/Shelf';

function Library() {
  return (
    <Wrapper>
      <Header />
      {SHELVES.map((shelf, index) => {
        const { title, className } = shelf;

        return <Shelf key={`shelf${index}`} title={title} className={className} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;

export default Library;
