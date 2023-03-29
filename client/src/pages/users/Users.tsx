import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Table from "@/components/Table";
import styled from "styled-components";
import Search from "@/components/Search";

const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: center;
  border-radius: 1.2rem;

  & > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
    padding-right: 2rem;
    flex-shrink: 1;
  }
`;

function Users() {
  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <Table
            datasets={[
              {
                label: "Usuário",
                data: ["bmacedo", "dmolina", "fdomingues", "psilva"],
              },
              {
                label: "Nome",
                data: [
                  "Breno Macedo",
                  "Danilo Molina",
                  "Fernanda Domingues",
                  "Pedro Silva",
                ],
              },
              {
                label: "E-mail",
                data: [
                  "breno.dev@milles.com",
                  "danilo.dev@milles.com",
                  "fernanda.psi@milles.com",
                  "pedro.fin@milles.com",
                ],
              },
            ]}
          />
        </div>
      </Style>
    </>
  );
}

export default Users;
