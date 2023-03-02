import { useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import useAccount from "../hooks/useAccount";

const Style = styled.section<{ mode: "main" | "light" | "dark" }>`
  display: flex;
  justify-content: space-evenly;

  width: 100%;
  min-height: 10rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  background-color: ${({ theme, mode }: any) =>
    theme[mode].white.backgroundColor};
  color: #000000;
  border: 1px solid black;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
`;

const Card = styled.div<{ color?: string; width?: string; height?: string }>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  background-color: ${({ color }) => (color ? color : "#3d08ff")};
  flex-grow: 1;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  padding: 1rem;

  & > p {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }

  & > div > p {
    font-size: 1.5rem;
  }
`;

function AdminPanel(): JSX.Element | null {
  const { user } = useAccount();
  return user?.admin ? (
    <Style mode="main">
      <Card width="15rem">
        <p>Usuários: 20/30</p>
        <div>
          <p>Ativos: 5</p>
          <p>Bloqueados: 5</p>
          <p>Online: 10</p>
          <p>Administradores: 8</p>
        </div>
      </Card>
      <Card width="15rem">
        {" "}
        <p>Clientes: 15</p>
        <div>
          <p>Em espera: 8</p>
          <p>Online: 10</p>
          <p>Administradores: 8</p>
        </div>
      </Card>
      <Card width="15rem">c</Card>
      <Card width="15rem">d</Card>
    </Style>
  ) : null;
}

export default AdminPanel;
