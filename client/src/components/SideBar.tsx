//import { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import useAccount from "@/hooks/useAccount";

const Style = styled.aside<{ mode: "main" | "light" | "dark" }>`
  width: 23rem;
  flex-shrink: 0;
  height: 100%;
  min-height: calc(100vh - 5rem);
  background-color: ${({ theme, mode }: any) =>
    theme[mode].secondary.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].secondary.textColor};
`;

//type sideBarProps = {};

function SideBar(): React.ReactElement {
  const theme = useTheme();
  const { user } = useAccount();
  return (
    <Style theme={theme} mode="main">
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>{user?.name}</li>
      </ul>
    </Style>
  );
}

export default SideBar;
