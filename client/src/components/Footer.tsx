import { useEffect } from "react";
import styled, { useTheme } from "styled-components";

const Style = styled.footer<{ mode: "main" | "light" | "dark" }>`
  width: 100%;
  height: 5rem;
  background-color: ${({ theme, mode }: any) =>
    theme[mode].tertiary.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].tertiary.textColor};
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
