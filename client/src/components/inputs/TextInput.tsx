import { useEffect, useState } from "react";
import styled from "styled-components";

const Style = styled.fieldset`
  flex: 1;
  margin: 1rem 0 0 1rem;
  padding: 0 1rem 1rem 0;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    min-width: 18rem;
    height: 3rem;
    border: 1px solid #dedede;
    outline: none;
    padding: 0 5px;
    border-radius: 5px;
  }

  & input:focus {
    border: 1px solid #4da6ff;
  }
`;

type InputProps = {
  htmlFor: string;
  onChangeCallBack: (value: string) => void;
  id: string;
  name: string;
  value: string | number;
  label: string;
  type?: "text" | "email" | "date";
};

function TextInput(props: InputProps): JSX.Element {
  const [text, setText] = useState(String(props.value));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setText(val);
  };

  useEffect(() => {
    props.onChangeCallBack(text);
  }, [text]);

  return (
    <Style>
      <label htmlFor={props.htmlFor}>
        <p>{props.label}</p>
        <input
          id={props.id}
          name={props.name}
          type={props.type || "text"}
          value={props.value}
          onChange={handleChange}
        />
      </label>
    </Style>
  );
}

export default TextInput;
