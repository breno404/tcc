import { memo, useEffect, useMemo, useState } from "react";
import SearchIcon from "@/assets/SearchIcon.svg";
import styled from "styled-components";

const Style = styled.div`
  width: min-content;
  color: #000;

  & label {
    display: flex;
  }

  & label > div {
    width: 30px;
    height: 30px;
    border: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;
    background-color: #eeeeee;
    border-collapse: collapse;
    cursor: pointer;
  }

  & label > div > img {
    max-height: 100%;
    max-width: 100%;
    padding: 5px;
  }

  & label input {
    border: none;
    border: 1px solid #dee2e6;
    border-collapse: collapse;
    padding: 2px 5px;
    outline: none;
  }

  & label input:focus {
    border: 1px solid #4da6ff;
  }
`;

type SearchProps = {
  datasets: {
    label: string;
    data: any[];
  }[];
  setFilter: (
    value: {
      label: string;
      data: any[];
    }[]
  ) => void;
};

function Search({ datasets, setFilter }: SearchProps) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (text && datasets && datasets.length > 0) {
      let filter = datasets;
      const filterIndex: Set<any> = new Set();

      filter = filter.map((column) => {
        const occurrences: number[] = column.data
          .map((d, i) => {
            return { index: i, value: d };
          })
          .filter((x) => new RegExp(text).test(x.value))
          .map((d) => {
            return d.index;
          });

        for (let o of occurrences) filterIndex.add(o);

        return column;
      });

      filter = filter.map((column) => {
        return {
          label: column.label,
          data: column.data.filter((v, i) => [...filterIndex].includes(i)),
        };
      });

      setFilter(filter);
    } else {
      setFilter(datasets);
    }
  }, [text, datasets]);

  return (
    <Style>
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Procurar..."
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <div>
          <img src={SearchIcon} alt="searchIcon" />
        </div>
      </label>
    </Style>
  );
}

export default memo(Search);
