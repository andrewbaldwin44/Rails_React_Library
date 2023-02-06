import styled from 'styled-components';
import { IBookData } from 'components/BookMenu/types';

export default function Book({ id, imageLinks }: IBookData) {
  if (!imageLinks) {
    return null;
  }

  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', (event.target as HTMLDivElement).id);
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
