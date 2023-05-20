import Breadcrumb from "@/components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table";
import styled from "styled-components";
import useGraphQL from "@/hooks/useGraphQL";
import { suppliers as suppliersQuery } from "@/graphQL/index";
import { useCallback, useEffect, useMemo } from "react";
import AddUserIcon from "@/assets/AddUserIcon.svg";

type SuppliersQueryResponse = {
  suppliers: [
    {
      id?: string;
      companyName?: string;
      cnpj?: string;
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

function Suppliers() {
  const {
    data: suppliersResponse,
    error,
    doRequest: doSuppliersRequest,
  } = useGraphQL<SuppliersQueryResponse>({
    query: suppliersQuery(["id", "companyName", "cnpj"]),
    baseUrl: "http://127.0.0.1:3000/",
    headers: { "Content-Type": "application/json" },
  });
  useMemo(() => {
    doSuppliersRequest();
  }, []);

  const navigate = useNavigate();

  const datasets = useCallback(() => {
    const suppliers = suppliersResponse?.suppliers || [];
    const labels = ["id", "Nome", "CNPJ"];
    const data = new Map();

    data.set(
      0,
      suppliers.map((c) => c.id || "")
    );
    data.set(
      1,
      suppliers.map((c) => c.companyName || "")
    );
    data.set(
      2,
      suppliers.map((c) => c.cnpj || "")
    );

    return labels.map((l, i) => {
      return { label: l, hidden: l === "id", data: data.get(i) };
    });
  }, [suppliersResponse]);

  const suppliersTableClickCallBack = (value: string) => {
    navigate("/suppliers/update/" + value);
  };

  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <StyleButton>
            <button onClick={() => navigate("/suppliers/new")}>
              <img src={AddUserIcon} alt="addUserIcon" />
            </button>
          </StyleButton>
          <Table
            onClickCallBack={suppliersTableClickCallBack}
            datasets={datasets()}
          />
        </div>
      </Style>
    </>
  );
}

export default Suppliers;
