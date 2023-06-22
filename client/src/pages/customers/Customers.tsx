import Breadcrumb from "@/components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table";
import styled from "styled-components";
import { customers as customersQuery } from "@/graphQL/index";
import { useCallback, useEffect, useMemo } from "react";
import AddUserIcon from "@/assets/AddUserIcon.svg";
import { useQuery } from "@apollo/client";

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

function Customers() {
  const {
    loading,
    error,
    data: response,
  } = useQuery(customersQuery(["id", "companyName", "cnpj"]));

  const navigate = useNavigate();

  const datasets = useCallback(() => {
    const labels = ["id", "Nome", "CNPJ"];
    const data = new Map();

    const customersId =
      response?.customers && response?.customers?.length > 0
        ? response?.customers?.map((c: any) => c.id || "")
        : [];
    const customersCompanyName =
      response?.customers && response?.customers?.length > 0
        ? response?.customers?.map((c: any) => c.companyName || "")
        : [];
    const customersCnpj =
      response?.customers && response?.customers?.length > 0
        ? response?.customers?.map((c: any) => c.cnpj || "")
        : [];

    data.set(0, customersId);
    data.set(1, customersCompanyName);
    data.set(2, customersCnpj);

    return labels.map((l, i) => {
      return { label: l, hidden: l === "id", data: data.get(i) };
    });
  }, [response]);

  const customersTableClickCallBack = (value: string) => {
    navigate("/customers/update/" + value);
  };

  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <StyleButton>
            <button onClick={() => navigate("/customers/new")}>
              <img src={AddUserIcon} alt="addUserIcon" />
            </button>
          </StyleButton>
          <Table
            onClickCallBack={customersTableClickCallBack}
            datasets={datasets()}
          />
        </div>
      </Style>
    </>
  );
}

export default Customers;
