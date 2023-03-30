import { memo, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import useAccount from "@/hooks/useAccount";
import { Link } from "react-router-dom";
const Style = styled.aside<{ mode: "main" | "light" | "dark" }>`
  flex-shrink: 0;
  height: 100%;
  min-height: calc(100vh - 5rem);
  background-color: ${({ theme, mode }: any) =>
    theme[mode].secondary.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].secondary.textColor};

  &.open {
    width: 23rem;
  }
  &.close {
    width: 6rem;
  }

  &.close ul {
    visibility: hidden;
  }

  & .menu {
    width: 100%;
    font-size: 1.5rem;
    padding: 0.5rem 0;
  }

  & .menu .menu-items {
    padding: 0.5rem 1rem;
  }

  & a,
  a:hover,
  a:active,
  a:visited {
    text-decoration: none;
    color: ${({ theme, mode }: any) => theme[mode].secondary.textColor};
  }
`;

type MenuProps = {
  abas: {
    name:
      | "Clientes"
      | "Fornecedores"
      | "Logística"
      | "Vendas"
      | "Estoque"
      | "Dashboards"
      | "Agenda"
      | "Usuários";
    href:
      | "customers"
      | "manufactures"
      | "logistics"
      | "sales"
      | "inventory"
      | "dashboards"
      | "calendar"
      | "users";
  }[];
};

const Menu = memo((props: MenuProps) => {
  function RenderAbas() {
    const Abas = props.abas.map((a) => {
      const key = `menu-item-${a.name}`;

      return (
        <li className="menu-items" key={key}>
          <Link to={a.href}>{a.name}</Link>
        </li>
      );
    });

    return Abas;
  }

  return (
    <ul className="menu">
      <li className="menu-items" key={"menu-item-home"}>
        <Link to="/">Início</Link>
      </li>
      {RenderAbas()}
    </ul>
  );
});

type SideBarProps = { open: boolean };

function SideBar({ open }: SideBarProps): React.ReactElement {
  const theme = useTheme();
  //const { user } = useAccount();

  const user = { name: "Breno Macedo Ernani de Sá" };
  return (
    <Style theme={theme} mode="main" className={open ? "open" : "close"}>
      <ul>
        <Menu
          abas={[
            { name: "Clientes", href: "customers" },
            { name: "Usuários", href: "users" },
          ]}
        />
        <li>{user?.name}</li>
      </ul>
    </Style>
  );
}

export default SideBar;
