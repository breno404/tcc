import { useEffect, useMemo, useCallback, memo } from "react";
import styled from "styled-components";
import useAccount from "@/hooks/useAccount";

const Style = styled.section<{ mode: "main" | "light" | "dark" }>`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  min-height: 11rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  background-color: ${({ theme, mode }: any) =>
    theme[mode].white.backgroundColor};
  color: #000000;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
`;

type CardProps = {
  title: string;
  content?: string;
  items?: string[];
};

const Card = styled.div<{ color?: string; width?: string; height?: string }>`
  width: ${({ width }) => (width ? width : "27rem")};
  height: ${({ height }) => (height ? height : "100%")};

  max-width: 100%;
  max-height: 100%;

  min-width: 27rem;
  min-height: 100%;

  overflow: hidden;

  border-radius: 2rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  background-color: ${({ color }) => (color ? color : "#fff")};

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  padding: 1rem;

  & > p {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    width: 100%;
  }

  & > div {
    display: block;
    width: 100%;
  }

  & > div > p {
    display: inline-block;
    font-size: 1.5rem;
  }
`;

const Cards = memo(({ info }: { info: CardProps[] }): JSX.Element => {
  return (
    <>
      {info.map((c, index) => {
        const key = "AdminPanelCard" + index;
        const TitleElement = <p>{c.title}</p>;
        const ContentElement = (
          <div
            style={{
              width: "100%",
              minWidth: "min-content",
            }}
          >
            <p
              style={{
                fontSize: "small",
                wordWrap: "normal",
                maxWidth: "100%",
              }}
            >
              {c.content}
            </p>
          </div>
        );
        const ItemsElement = (
          <div
            style={{
              width: "100%",
              minWidth: "min-content",
              height: "calc(100% - 1rem)",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              overflowWrap: "normal",
            }}
          >
            {c.items?.map((i, index2) => {
              const key2 = "AdminPanelCardItem" + index2;
              return (
                <p
                  key={key2}
                  style={{
                    padding: "0.2rem",
                    fontSize: "small",
                    wordWrap: "normal",
                  }}
                >
                  {i}
                </p>
              );
            })}
          </div>
        );

        return (
          <Card height="11rem" key={key}>
            {TitleElement}
            {c?.content ? ContentElement : null}
            {c?.items && c?.items.length > 0 ? ItemsElement : null}
          </Card>
        );
      })}
    </>
  );
});

function AdminPanel(): JSX.Element | null {
  //const { user } = useAccount();
  const user = { admin: true };

  return user?.admin ? (
    <Style mode="main">
      <Cards
        info={[
          {
            title: "Usuários : 39/50",
            content:
              "Parece que sua licença de usuários está chegando ao limite, caso deseje atualizar seu plano acesse: http://www.example.com.br",
          },
          {
            title: "Módulos ativos: 7/7",
            items: [
              "Clientes",
              "Fornecedores",
              "Logística",
              "Dashboards",
              "Vendas",
              "Estoque",
              "Agenda",
            ],
          },
          {
            title: "Rastreamento de acessos: 27",
            items: [
              "[13/05/2023 16:00]: Tarefa concluída, 'juliana.moura' criou o cliente 'Stefanini'",
              "[13/05/2023 15:40]: Permissão negada, 'juliana.moura' não possui acesso ao módulo 'Estoque'",
              "[13/05/2023 15:40]: , 'juliana.moura' não possui acesso ao módulo 'Estoque'",
              "[13/05/2023 15:40]: Permissão negada, 'juliana.moura' não possui acesso ao módulo 'Estoque'",
              "[13/05/2023 15:40]: Permissão negada, 'juliana.moura' não possui acesso ao módulo 'Estoque'",
              "[13/05/2023 15:40]: Permissão negada, 'juliana.moura' não possui acesso ao módulo 'Estoque'",
            ],
          },
          {
            title: "-------- ------: 0",
            items: [
              "Financeiro",
              "Contas a pagar",
              "Contas a receber",
              "Administrativo",
              "Fiscal",
              "Logística",
            ],
          },
        ]}
      />
    </Style>
  ) : null;
}

export default AdminPanel;
