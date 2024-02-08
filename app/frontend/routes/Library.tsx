import styled from "styled-components";

import Header from "~/components/Header/Index";
import Shelves from "~/modules/Shelf/Shelf.container";

export default function Library() {
  return (
    <Wrapper>
      <Header />
      <Shelves />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;
