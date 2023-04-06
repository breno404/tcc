import Breadcrumb from "@/components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table";
import styled from "styled-components";
import useGraphQL from "@/hooks/useGraphQL";
import { users as usersQuery } from "@/graphQL/index";
import { useCallback, useEffect, useMemo } from "react";

type UsersQueryResponse = {
  users: [
    {
      id?: string;
      name?: string;
      userName?: string;
      email?: string;
    }
  ];
};

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
  const {
    data: usersResponse,
    error,
    doRequest: doUsersRequest,
  } = useGraphQL<UsersQueryResponse>({
    query: usersQuery(["id", "userName", "name", "email"]),
    baseUrl: "http://127.0.0.1:3000/",
    headers: { "Content-Type": "application/json" },
  });
  useMemo(() => {
    doUsersRequest();
  }, []);

  const navigate = useNavigate();

  const datasets = useCallback(() => {
    const users = usersResponse?.users || [];
    const labels = ["id", "Usuário", "Nome", "E-mail"];
    const data = new Map();

    console.log(users);

    data.set(
      0,
      users.map((u) => u.id || "")
    );
    data.set(
      1,
      users.map((u) => u.userName || "")
    );
    data.set(
      2,
      users.map((u) => u.name || "")
    );
    data.set(
      3,
      users.map((u) => u.email || "")
    );

    return labels.map((l, i) => {
      return { label: l, hidden: l === "id", data: data.get(i) };
    });
  }, [usersResponse]);

  const usersTableClickCallBack = (value: string) => {
    navigate("/users/update/" + value);
  };

  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <Table
            onClickCallBack={usersTableClickCallBack}
            datasets={datasets()}
          />
        </div>
      </Style>
    </>
  );
}

export default Users;
