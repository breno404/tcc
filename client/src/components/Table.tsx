import { memo, useEffect, useMemo } from "react";
import SortIcon from "@/assets/SortIcon.svg";
import styled from "styled-components";

const Style = styled.div`
  width: 100%;
  height: 500px;
  color: #000;
  margin: 2rem 0 0 2rem;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: auto;

  & > table,
  th,
  td {
    border: 1px solid;
    border-color: #dee2e6;
  }

  & > table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
  }

  & > table th {
    vertical-align: middle;
    text-align: center;
    padding: 10px;
    background-color: #fff;
  }

  & > table th > p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
  }

  & > table th > p img {
    max-height: 100%;
    max-width: 20px;
    cursor: pointer;
  }

  & > table td {
    vertical-align: middle;
    font-size: 1.2rem;
    padding: 10px;
  }

  & > table > tbody > tr {
    background-color: #fff;
  }

  & > table > tbody > tr:nth-child(2n) {
    background-color: #eeeeee;
  }
`;

type TableProps = {
  headers?: string[];
  datasets: {
    label: string;
    data: any[];
  }[];
};

function Table({ headers, datasets }: TableProps) {
  useMemo(() => {
    if (headers && headers.length > 0) {
      if (headers.length !== datasets.length) {
        throw new Error(
          "Caso os Headers sejam fornecidos os mesmos devem possuir tamanho igual ao dataset da tabela"
        );
      }
    }
  }, [headers, datasets]);

  const RenderHeaders = () => {
    let HeadersElements = [];
    if (headers && headers.length > 0) {
      HeadersElements = headers.map((text, index) => {
        const key = "TableHeader-" + text;
        return (
          <th key={key}>
            <p>
              <span>{text}</span>
              <img src={SortIcon} onClick={() => {}} />
            </p>
          </th>
        );
      });
    } else {
      HeadersElements = datasets.map((ds, index) => {
        const key = "TableHeader-" + ds.label;
        return (
          <th key={key}>
            <p>
              <span>{ds.label}</span>
              <img src={SortIcon} onClick={() => {}} />
            </p>
          </th>
        );
      });
    }

    return <tr>{HeadersElements}</tr>;
  };

  return (
    <Style>
      <table>
        <thead>
          <RenderHeaders />
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>e</td>
            <td>f</td>
            <td>g</td>
          </tr>
        </tfoot>
      </table>
    </Style>
  );
}

export default memo(Table);
