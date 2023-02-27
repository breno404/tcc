import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
    padding:0;
    margin:0;
    vertical-align:baseline;
    list-style:none;
    border:0;
    box-sizing:border-box;
    }
    
html {
    font-size: 62.5%;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
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
`;

export default GlobalStyle;
