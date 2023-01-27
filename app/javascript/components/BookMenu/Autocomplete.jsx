import React from 'react';
import styled from 'styled-components';

export default function Autocomplete({ items }) {
  return (
    <Wrapper>
      {items &&
        items.length &&
        items.map(({ id, authors, categories, title, imageLinks }) => (
          <Item key={id}>
            {imageLinks && <img src={imageLinks.smallThumbnail} alt={title} />}
            <div>
              <span>{title}</span>
              <span className='author'>By {authors}</span>
            </div>
          </Item>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  color: black;
  background-color: white;
  border: 2px solid black;
  z-index: 40;
  box-shadow: 1px 1px solid var(--dark-gray);
  max-height: 400px;
  overflow-y: scroll;
`;

const Item = styled.div`
  display: flex;
  padding: 20px 20px;
  line-height: 1.5;
  cursor: pointer;

  img {
    height: 60px;
    width: 50px;
    margin-right: 20px;
  }

  span {
    display: block;

    &.author {
      font-style: italic;
    }
  }
`;
