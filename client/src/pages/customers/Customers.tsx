import Breadcrumb from "@/components/Breadcrumb";
import styled from "styled-components";
import profileImgDefault from "@/assets/profile.webp";
import { useCallback, useState } from "react";
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";

const Style = styled.div`
  display: flex;
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

  & form {
    color: #000;
    margin: 2rem 0 0 2rem;
    padding: 2rem;
    border-radius: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    overflow: auto;
  }

  & form section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const StyledButton = styled.button<{
  backgroundColor: string;
}>`
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  border: 1px solid #dedede;
  border-radius: 5px;
  cursor: pointer;

  background-color: ${({ backgroundColor }) => {
    const options: { [x: string]: string } = {
      default: "#24405C",
      transparent: "transparent",
    };

    return options[backgroundColor] == undefined
      ? "#fff"
      : options[backgroundColor];
  }};

  color: ${({ backgroundColor }) =>
    backgroundColor == "default" ? "#fff" : "#000"};
`;

const Button = ({ backgroundColor, label, onClick }: any) => {
  return (
    <StyledButton backgroundColor={backgroundColor} onClick={onClick}>
      <p>{label}</p>
    </StyledButton>
  );
};

const StyledInput = styled.fieldset`
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

const StyledProfile = styled.fieldset`
  margin-bottom: 2rem;
  & input[type="file"] {
    display: none;
  }

  & .profile {
    max-width: 150px;
    max-height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #dee2e6;
    cursor: pointer;
  }

  & .profile img {
    max-width: 100%;
  }
`;

type InputProps = {
  htmlFor: string;
  onChange: (event: any) => void;
  id: string;
  name: string;
  value: string | number;
  label: string;
  type?: string;
};

const Input = ({
  htmlFor,
  onChange,
  id,
  name,
  value,
  label,
  type,
}: InputProps) => {
  return (
    <StyledInput>
      <label htmlFor={htmlFor}>
        <p>{label}</p>
        <input
          id={id}
          name={name}
          type={type || "text"}
          value={value}
          onChange={onChange}
        />
      </label>
    </StyledInput>
  );
};

const Profile = ({ htmlFor, onChange, id, name, value, src }: any) => {
  return (
    <StyledProfile>
      <label htmlFor={htmlFor}>
        <div className="profile">
          <img src={src} alt={name} />
        </div>
        <input id={id} name={name} type="file" onChange={onChange} />
      </label>
    </StyledProfile>
  );
};

function NewCustomers(): JSX.Element {
  const [profileImage, setpProfileImage] = useState(profileImgDefault);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeProfilePhoto = useCallback(
    (event: any) => {
      if (event.target.files) {
        const [photo] = event.target.files;

        setpProfileImage(URL.createObjectURL(photo));
      }
    },
    [profileImage]
  );

  const handleChangeUserName = (event: any) => {
    const val = event.currentTarget.value;
    setUserName(val);
  };
  const handleChangeName = (event: any) => {
    const val = event.currentTarget.value;
    setName(val);
  };
  const handleChangeEmail = (event: any) => {
    const val = event.currentTarget.value;
    setEmail(val);
  };
  const handleChangePhone = (event: any) => {
    const val = event.currentTarget.value;
    setPhone(val);
  };
  const handleChangePassword = (event: any) => {
    const val = event.currentTarget.value;
    setPassword(val);
  };
  const handleChangeConfirmPassword = (event: any) => {
    const val = event.currentTarget.value;
    setConfirmPassword(val);
  };

  const handleClearForm = (event: any) => {
    setpProfileImage(profileImgDefault);
    setUserName("");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmitData = useCallback(
    (event: any) => {
      (async () => {
        const url = "";
        const data = { userName, name, email, phone, password };
        const config: AxiosRequestConfig = {
          baseURL: "baseUrl",
          responseType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type":
              "application/json;application/x-www-form-urlencoded",
            "User-Agent": window.navigator.userAgent,
            Authorization: "Bearer token",
          },
        };

        try {
          const response = await axios.post(url, data, config);
          const url2 = "";
          const formData = new FormData();

          const image = await fetch(profileImage).then((r) => r.blob());

          formData.append("profile", image);

          const config2: AxiosRequestConfig = {
            baseURL: "baseUrl",
            responseType: "json",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              "User-Agent": window.navigator.userAgent,
              Authorization: "Bearer token",
            },
          };

          if (response.status == 200) {
            const response2 = await axios.post(url2, data, config2);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    },
    [profileImage, userName, name, email, phone, password]
  );

  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <form>
            <section>
              <Profile
                id="profile"
                name="profile"
                htmlFor="profile"
                src={profileImage}
                value={""}
                onChange={handleChangeProfilePhoto}
              />
            </section>
            <section>
              <Input
                id="user"
                name="user"
                htmlFor="user"
                label="Usuário"
                value={userName}
                onChange={handleChangeUserName}
              />
              <Input
                id="name"
                name="name"
                htmlFor="name"
                label="Nome"
                value={name}
                onChange={handleChangeName}
              />
            </section>
            <section>
              <Input
                id="email"
                name="email"
                htmlFor="email"
                label="E-mail"
                value={email}
                onChange={handleChangeEmail}
              />
              <Input
                id="phone"
                name="phone"
                htmlFor="phone"
                label="Telefone"
                value={phone}
                onChange={handleChangePhone}
              />
            </section>
            <section>
              <Input
                id="password"
                name="password"
                htmlFor="password"
                label="Senha"
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                htmlFor="confirmPassword"
                label="Confirmar senha"
                type="password"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
            </section>
            <section>
              <div
                style={{ margin: "1rem 0 0 1rem", padding: "0 1rem 1rem 0" }}
              >
                <Button
                  label="Salvar"
                  backgroundColor="default"
                  onClick={handleSubmitData}
                />
              </div>
              <div
                style={{ margin: "1rem 0 0 1rem", padding: "0 1rem 1rem 0" }}
              >
                <Button
                  label="Limpar"
                  backgroundColor="transparent"
                  onClick={handleClearForm}
                />
              </div>
            </section>
          </form>
        </div>
      </Style>
    </>
  );
}

export default NewCustomers;
