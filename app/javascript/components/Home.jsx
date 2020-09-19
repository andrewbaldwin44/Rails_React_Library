import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Home() {
  return (
    <div>
      Welcome
      <Link to='login'>Login</Link>
    </div>
  )
}

export default Home;
