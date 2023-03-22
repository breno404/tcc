import { memo, useCallback, useEffect, useMemo, useState } from "react";
import SortIcon from "@/assets/SortIcon.svg";
import styled from "styled-components";
import Search from "./Search";

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

  & > .not-found-data {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    font-size: 1.4rem;
    border: 1px solid #dee2e6;
    border-top: none;
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
  const [filter, setFilter] = useState(datasets);

  useMemo(() => {
    if (headers && headers.length > 0) {
      if (headers.length !== filter.length) {
        throw new Error(
          "Caso os Headers sejam fornecidos os mesmos devem possuir tamanho igual ao dataset da tabela"
        );
      }
    }
  }, [headers, datasets]);

  const RenderHeaders = () => {
    let HeaderElements = [];
    if (headers && headers.length > 0) {
      HeaderElements = headers.map((text, index) => {
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
      HeaderElements = filter.map((ds, index) => {
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

    return <tr>{HeaderElements}</tr>;
  };

  const RenderRows = useCallback(() => {
    const BodyElements: any[] = [];
    const datasetsLength = filter.length;
    const rowsLength = filter[0].data.length;

    for (let j = 0; j < rowsLength; j++) {
      const row: any[] = [];
      for (let i = 0; i < datasetsLength; i++) {
        const key2 = "tableData-".concat(
          String(i),
          String(j),
          "-",
          filter[i].data[j]
        );

        row.push(<td key={key2}>{filter[i].data[j]}</td>);
      }
      const key = "tableRow-" + j;
      BodyElements.push(<tr key={key}>{row}</tr>);
    }

    return <>{BodyElements}</>;
  }, [filter]);

  const handleSetFilter = useCallback(
    (value: any[]) => {
      setFilter([...value]);
    },
    [filter]
  );

  return (
    <Style>
      <Search datasets={datasets} setFilter={handleSetFilter} />
      <br />
      <table>
        <thead>
          <RenderHeaders />
        </thead>
        <tbody>
          {filter && filter[0].data.length > 0 ? <RenderRows /> : null}
        </tbody>
      </table>
      {!filter || filter[0].data.length <= 0 ? (
        <div className="not-found-data">Nenhum dado encontrado.</div>
      ) : null}
    </Style>
  );
}

export default memo(Table);
