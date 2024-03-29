import { createGlobalStyle } from "styled-components";

import BackgroundImage from "~/assets/images/background.jpeg";

const GlobalStyles = createGlobalStyle`
  :root {
    --light-blue: #40c4ff;
    --light-gray: #9e9e9e;
    --light-green: #00e676;

    --authentication-form-width: 400px;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    font-family: 'Roboto', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 18px;
  	vertical-align: baseline;
  	font-family: 'Roboto', sans-serif;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }

  body {
  	line-height: 1;
    width: 100vw;
    height: 100vh;
    color: white;
    font-size: 18px;
    overflow-x: hidden;

    background-image: url('${BackgroundImage}');
    background-attachment: fixed;
    background-size: cover;
  }

  blockquote, q {
  	quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
  	content: '';
  	content: none;
  }

  table {
  	border-collapse: collapse;
  	border-spacing: 0;
  }

  button, a, select, input {
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
