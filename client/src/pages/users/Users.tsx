import Breadcrumb from "@/components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table";
import styled from "styled-components";
import useGraphQL from "@/hooks/useGraphQL";
import { users as usersQuery } from "@/graphQL/index";
import { useCallback, useEffect, useMemo } from "react";
import AddUserIcon from "@/assets/AddUserIcon.svg";

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

const StyleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #000;
  width: 100%;
  margin: 2rem 0 0 2rem;
  padding: 2rem 2rem 0 2rem;

  & button {
    width: 35px;
    height: 35px;
    border: 1px solid #fff;
    background-color: #ffffff;
    border-color: #dedede;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    cursor: pointer;
  }

  & button > img {
    max-height: 100%;
    max-width: 100%;
    padding: 5px;
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
          <StyleButton>
            <button onClick={() => navigate("/users/new")}>
              <img src={AddUserIcon} alt="addUserIcon" />
            </button>
          </StyleButton>
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
