import { useCallback, useEffect, useState } from "react";
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
  type?: string;
};

function PhoneInput(props: InputProps): JSX.Element {
  const [phone, setPhone] = useState(String(props.value));

  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,4})(\d{0,4})$/);

    if (match) {
      return !match[2]
        ? match[1]
        : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    } else {
      return phoneNumberString;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace" && event.key !== "Delete") {
      const formattedPhoneNumber = formatPhoneNumber(props.value + event.key);
      setPhone(formattedPhoneNumber);
    } else if (event.key == "Backspace") {
      setPhone(String(props.value).slice(0, -1));
    }
  };

  useEffect(() => {
    const formattedPhoneNumber = formatPhoneNumber(String(phone));
    props.onChangeCallBack(formattedPhoneNumber);
  }, [phone]);

  return (
    <Style>
      <label htmlFor={props.htmlFor}>
        <p>{props.label}</p>
        <input
          id={props.id}
          name={props.name}
          type={"tel"}
          value={props.value}
          onChange={() => {}}
          onKeyDown={handleKeyDown}
        />
      </label>
    </Style>
  );
}

export default PhoneInput;
