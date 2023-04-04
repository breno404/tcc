import { memo, useCallback, useEffect, useMemo, useState } from "react";
import SortIcon from "@/assets/SortIcon.svg";
import styled from "styled-components";
import Search from "./Search";

const Style = styled.div`
  width: 100%;
  min-height: 500px;
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

  & > table th:first-child {
    display: none;
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
    cursor: pointer;
  }

  & > table > tbody > tr {
    background-color: #fff;
  }

  & > table > tbody > tr:nth-child(2n) {
    background-color: #eeeeee;
  }

  & > table > tbody > tr > td:first-child {
    display: none;
  }
`;

type TableProps = {
  onClickCallBack: (value: any) => void;
  headers?: string[];
  datasets: {
    label: string;
    hidden?: boolean;
    data: any[];
  }[];
};

function Table({ headers, datasets, onClickCallBack }: TableProps) {
  const [filter, setFilter] = useState(datasets);
  const [limit, setLimit] = useState(25);
  const [offSet, setOffSet] = useState(0);

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
        if (text.toLowerCase() !== "id") {
          return (
            <th key={key}>
              <p>
                <span>{text}</span>
                <img src={SortIcon} onClick={() => {}} />
              </p>
            </th>
          );
        } else {
          return (
            <th key={key}>
              <p>
                <span>{""}</span>
              </p>
            </th>
          );
        }
      });
    } else {
      HeaderElements = filter.map((ds, index) => {
        const key = "TableHeader-" + ds.label;
        if (ds.label.toLowerCase() !== "id") {
          return (
            <th key={key}>
              <p>
                <span>{ds.label}</span>
                <img src={SortIcon} onClick={() => {}} />
              </p>
            </th>
          );
        } else {
          return (
            <th key={key}>
              <p>
                <span>{""}</span>
              </p>
            </th>
          );
        }
      });
    }

    return <tr>{HeaderElements}</tr>;
  };

  const RenderRows = useCallback(() => {
    const BodyElements: any[] = [];
    const filterLimited = filter.map((ob) => {
      const lim =
        ob.data.length < offSet * limit ? ob.data.length : offSet * limit;
      return { ...ob, data: ob.data.slice(offSet * limit), lim };
    });
    const datasetsLength = filterLimited.length;
    const rowsLength = filterLimited[0].data.length;

    for (let j = 0; j < rowsLength; j++) {
      const row: any[] = [];
      for (let i = 0; i < datasetsLength; i++) {
        const key2 = "tableData-".concat(
          String(i),
          String(j),
          "-",
          filterLimited[i].data[j]
        );

        if (filterLimited[i].hidden) {
          row.push(
            <td
              key={key2}
              onClick={() => onClickCallBack(filterLimited[0].data[j])}
            >
              {""}
            </td>
          );
        } else {
          row.push(
            <td
              key={key2}
              onClick={() => onClickCallBack(filterLimited[0].data[j])}
            >
              {filterLimited[i].data[j]}
            </td>
          );
        }
      }
      const key = "tableRow-" + j;
      BodyElements.push(<tr key={key}>{row}</tr>);
    }

    return <>{BodyElements}</>;
  }, [filter]);

  const RenderFooter = useCallback(() => {
    const filterLimited = filter.map((ob) => {
      const lim =
        ob.data.length < offSet * limit ? ob.data.length : offSet * limit;
      return { ...ob, data: ob.data.slice(offSet * limit), lim };
    });
    const filterLength = filter[0].data.length;
    const length = Math.ceil(filterLength / limit);
    const range = [...Array(length).keys()];
    const buttons = [];

    for (let n of range) {
      const key = "offsetButton-" + n;
      buttons.push(
        <button
          key={key}
          onClick={() => setOffSet(n)}
          style={{ padding: "10px", fontWeight: "bolder" }}
        >
          {n + 1}
        </button>
      );
    }

    const LimitElement = () => (
      <select
        name="limit"
        id="limit"
        defaultValue={limit}
        style={{ border: "1px solid #dee2e6" }}
        onChange={(event) => {
          const val = parseInt(event.currentTarget.value);
          setLimit(val);
        }}
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
    );

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          marginTop: "1rem",
          fontSize: "1.2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          Mostrar por página: <LimitElement />
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {buttons}
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {offSet * limit + 1} -{" "}
          {(offSet + 1) * limit > filterLength
            ? filterLength
            : (offSet + 1) * limit}{" "}
          de {filterLength}
        </div>
      </div>
    );
  }, [limit, offSet, filter]);

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
      {filter && filter[0].data.length > 0 ? <RenderFooter /> : null}
    </Style>
  );
}

export default memo(Table);
