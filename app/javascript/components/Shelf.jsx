import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Shelf({ title, width, className }) {
  return (
    <Wrapper className={className}>
      <h2>{title}</h2>
      <Container />
    </Wrapper>
  )
}

Shelf.defaultProps = {
  className: '',
};

const Wrapper = styled.div`
  margin: 0 auto 120px auto;
  width: 100vw;

  h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 1.4em;
    color: white;
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
  height: 250px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Shelf;
