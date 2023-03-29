//import { useEffect } from "react";
import styled, { useTheme } from "styled-components";

const Style = styled.header<{ mode: "main" | "light" | "dark" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-size: medium;

  width: 100%;
  height: 5rem;
  background-color: ${({ theme, mode }: any) =>
    theme[mode].primary.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].primary.textColor};
`;

const Logo = styled.p`
  font-weight: 700;

  &::before {
    content: "SMART ";
    color: #fff;
  }
  &::after {
    content: " SALES";
    color: #0f8100;
  }
`;

type headerProps = { title: string; onClick: Function };

const HamburguerButton = ({ onClick }: { onClick: Function }) => {
  return (
    <button
      style={{
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        width: "40px",
        height: "40px",
        borderRadius: "5px",
        background: "none",
      }}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClick(event)}
    >
      <p
        style={{
          width: "80%",
          height: "5px",
          margin: "2px 0",
          color: "#fff",
          borderColor: "#fff",
          backgroundColor: "#fff",
        }}
      ></p>
      <p
        style={{
          width: "80%",
          height: "5px",
          margin: "2px 0",
          color: "#fff",
          borderColor: "#fff",
          backgroundColor: "#fff",
        }}
      ></p>
      <p
        style={{
          width: "80%",
          height: "5px",
          margin: "2px 0",
          color: "#fff",
          borderColor: "#fff",
          backgroundColor: "#fff",
        }}
      ></p>
    </button>
  );
};

function Header({ title, onClick }: headerProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Style theme={theme} mode="main">
      <div style={{ flex: 1 }}>
        <HamburguerButton onClick={onClick} />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Logo />
      </div>
      <div style={{ flex: 1 }}></div>
    </Style>
  );
}

export default Header;
