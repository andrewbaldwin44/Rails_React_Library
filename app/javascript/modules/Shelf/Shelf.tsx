import styled from 'styled-components';

interface IShelf {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();

  const data = event.dataTransfer.getData('text');
  event.currentTarget.appendChild(document.getElementById(data)!);
};

const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

export default function Shelf({ title, className, children }: IShelf) {
  return (
    <Wrapper className={className}>
      <h2>{title}</h2>
      <Container onDrop={onDrop} onDragOver={allowDrop}>
        {children}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto 120px auto;
  width: 100vw;

  h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 1.4em;
    padding: 15px 10px;
    text-shadow: 4px 4px 5px black;
  }

  &.reading {
    margin-top: 120px;
    margin-bottom: 160px;
    width: 40vw;
    text-align: center;

    h2 {
      font-size: 1.6em;
    }
  }

  &:last-child {
    margin-bottom: 50px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 45px;
  column-gap: 16px;
`;
