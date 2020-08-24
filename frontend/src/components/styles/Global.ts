import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap');
    html, body, main, article, section, aside, #root {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        margin: 0;
        height: 100%;
    }
`;

export default GlobalStyle;
