import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

const bookData = state => ({
  bookData: state.google_books.bookData,
});

function Autocomplete({ bookData }) {
  return (
    <Wrapper>
      {bookData &&
        bookData.map(data => {
          const {
            volumeInfo: {
              authors,
              categories,
              title,
              imageLinks: { smallThumbnail },
            },
            id,
          } = data;

          const authorsList = authors ? authors.toString() : '';

          return (
            <Item key={id}>
              <div>
                <img src={smallThumbnail} alt={title} />
              </div>

              <div>
                <span>{title}</span>
                <span className='author'>By {authorsList}</span>
              </div>
            </Item>
          );
        })}
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

export default connect(bookData)(Autocomplete);
