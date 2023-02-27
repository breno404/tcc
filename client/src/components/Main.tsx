//import { useEffect } from "react";
import { PropsWithChildren } from "react";
import styled, { useTheme } from "styled-components";

const Style = styled.main<{ mode: "main" | "light" | "dark" }>`
  background-color: ${({ theme, mode }: any) =>
    theme[mode].white.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].primary.textColor};
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 5rem - 5rem);
  height: 100%;
`;

function Main({ children }: PropsWithChildren): React.ReactElement {
  const theme = useTheme();
  return (
    <Style theme={theme} mode="main">
      {children}
    </Style>
  );
}

export default Main;
