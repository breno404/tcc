import { useEffect } from "react";
import styled, { useTheme } from "styled-components";

const Style = styled.footer<{ mode: "main" | "light" | "dark" }>`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, mode }: any) =>
    theme[mode].tertiary.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].tertiary.textColor};

  & > p {
    text-align: center;
    vertical-align: middle;
    font-size: 1.4rem;
  }
`;

type FooterProps = {};

function Footer(): React.ReactElement {
  const theme = useTheme();
  return (
    <Style theme={theme} mode="main">
      <p> Trabalho de Conclusão de Curso - 2023</p>
    </Style>
  );
}

export default Footer;
