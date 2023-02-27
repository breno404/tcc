//import { useEffect } from "react";
import styled, { useTheme } from "styled-components";

const Style = styled.header<{ mode: "main" | "light" | "dark" }>`
  width: 100%;
  height: 5rem;
  background-color: ${({ theme, mode }: any) =>
    theme[mode].primary.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].primary.textColor};
`;

type headerProps = { title: string };

function Header({ title }: headerProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Style theme={theme} mode="main">
      {title}
    </Style>
  );
}

export default Header;
