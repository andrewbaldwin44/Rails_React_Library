import styled from "styled-components";

import { IBookData } from "~/components/BookMenu/types";

export default function Book({ id, imageLinks }: IBookData) {
  if (!imageLinks) {
    return;
  }

  const onDrag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  return (
    <Wrapper
      id={id}
      draggable={true}
      onDragStart={onDrag}
      backgroundImage={imageLinks.smallThumbnail}
    />
  );
}

const Wrapper = styled.div<{ backgroundImage: string }>`
  cursor: grab;
  height: 200px;
  width: 100px;
  background-image: url(${({ backgroundImage }) => backgroundImage});

  &:active {
    border: 1px solid lightgreen;
  }
`;
