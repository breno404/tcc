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
};

function PasswordInput(props: InputProps): JSX.Element {
  const [password, setPassword] = useState(String(props.value));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setPassword(val);
  };

  useEffect(() => {
    props.onChangeCallBack(password);
  }, [password]);

  return (
    <Style>
      <label htmlFor={props.htmlFor}>
        <p>{props.label}</p>
        <input
          id={props.id}
          name={props.name}
          type={"password"}
          value={props.value}
          minLength={8}
          onChange={handleChange}
        />
      </label>
    </Style>
  );
}

export default PasswordInput;
