import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


* {
    padding:0;
    margin:0;
    vertical-align:baseline;
    list-style:none;
    border:0;
    box-sizing:border-box;
    font-family: Roboto,"Sans-serif", Helvetica
    }
    
html {
    font-size: 62.5%;
}

article::-webkit-scrollbar,section::-webkit-scrollbar,div::-webkit-scrollbar{
    width: 8px;
    
}

article::-webkit-scrollbar-track,section::-webkit-scrollbar-track,div::-webkit-scrollbar-track{ background-color: #eeeeee;border-radius: 5px;}

article::-webkit-scrollbar-thumb,section::-webkit-scrollbar-thumb,div::-webkit-scrollbar-thumb {box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);border-radius: 5px;}

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
