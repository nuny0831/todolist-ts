import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};

@font-face {
	font-family: 'KCCChassam';
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCCChassam.woff2') format('woff2');
	font-weight: normal;
	font-style: normal;
}

*{
	box-sizing: border-box;
}

body, button, select {
	font-family: 'KCCChassam';
}

input, textarea {
	font-family: 'KCCChassam';
}
`;

export default GlobalStyle;
