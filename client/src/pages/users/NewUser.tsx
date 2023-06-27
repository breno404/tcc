import Breadcrumb from "@/components/Breadcrumb";
import styled from "styled-components";
import profileImgDefault from "@/assets/profile.webp";
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import PhoneInput from "@/components/inputs/PhoneInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import TextInput from "@/components/inputs/TextInput";
import validate from "@/helpers/validate";
import { createUser as createUserMutation } from "@/graphQL/index";
import { useMutation } from "@apollo/client";
import useToken from "@/hooks/useToken";

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

type ButtonProps = {
  backgroundColor: "default" | "transparent";
  label: string;
  onClick: any;
};

const Button = ({ backgroundColor, label, onClick }: ButtonProps) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      type="button"
      onClick={onClick}
    >
      <p>{label}</p>
    </StyledButton>
  );
};

const StyledProfile = styled.fieldset<{ src: string; srcDefault: string }>`
  margin-bottom: 2rem;
  & input[type="file"] {
    display: none;
  }

  & .profile {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #dee2e6;
    cursor: pointer;
    background-image: ${({ src, srcDefault }) => {
      return src && src != "" ? `url(${src});` : `url(${srcDefault});`;
    }};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #dedede;
  }
`;

type ProfileProps = {
  htmlFor: string;
  onChangeCallBack: (value: File | null) => void;
  id: string;
  name: string;
  src: string;
  srcDefault: string;
};

const Profile = (props: ProfileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const accept = ["image/png", "image/jpeg", "image/webp"].join(", ");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const [photo] = event.target.files;
      setFile(photo);
    }
  };

  useEffect(() => {
    props.onChangeCallBack(file);
  }, [file]);

  return (
    <StyledProfile src={props.src} srcDefault={props.srcDefault}>
      <label htmlFor={props.htmlFor}>
        <div className="profile"></div>
        <input
          id={props.id}
          name={props.name}
          type="file"
          onChange={handleChange}
          accept={accept}
        />
      </label>
    </StyledProfile>
  );
};

function NewUser(): JSX.Element {
  const token = useToken()
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [mutation, { data: createdUser, error: createdUserError }] =
    useMutation(
      createUserMutation(["id", "name", "email", "phone", "userName"])
    );

  const handleChangeProfileCallBack = useCallback(
    (photo: File | null) => {
      if (photo) {
        setProfileImage(URL.createObjectURL(photo));
      } else {
        setProfileImage("");
      }
    },
    [profileImage]
  );

  const handleChangeUserNameCallBack = (value: string) => {
    setUserName(value);
  };
  const handleChangeNameCallBack = (value: string) => {
    setName(value);
  };
  const handleChangeEmailCallBack = (value: string) => {
    setEmail(value);
  };
  const handleChangePhoneCallBack = (value: string) => {
    setPhone(value);
  };
  const handleChangePasswordCallBack = (value: string) => {
    setPassword(value);
  };
  const handleChangeConfirmPasswordCallBack = (value: string) => {
    setConfirmPassword(value);
  };

  const handleClearForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setProfileImage("");
    setUserName("");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmitData = useCallback(
    (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      let valid = true;

      let validEmail =
        validate.exists(email) &&
        validate.has(email, { specialChar: true }).length == 0;

      let validUserName = validate.exists(userName);
      let validName = validate.exists(name);
      let validPhone = validate.exists(phone);
      let validPassword =
        validate.exists(password) &&
        validate.has(password, {
          minLenght: 8,
          specialChar: true,
          digits: true,
        }).length == 0;

      if (!validPassword) {
        valid = false;
      }

      if (password !== confirmPassword) {
        console.log(password);
        console.log(confirmPassword);
        valid = false;
      }

      if (!validName || !validEmail || !validUserName || !validPhone) {
        valid = false;
      }

      console.log(validEmail);
      console.log(validUserName);
      console.log(validName);
      console.log(validPhone);
      console.log(validPassword);
      console.log(valid);

      if (valid) {
        (async () => {
          const createdUserReponse = await mutation({
            variables: {
              data: {
                userName,
                name,
                email,
                phone,
                password,
              },
            },
          });

          try {
            if (createdUserReponse?.data) {
              const formData = new FormData();
              const blob = await (await fetch(profileImage)).blob();
              const filename = `profile-${
                createdUserReponse.data?.createUser?.id
              }.${blob.type.split("/")[1]}`;
              const image = new File([blob], filename, {
                lastModified: new Date().getTime(),
                type: blob.type,
              });

              const url = "/upload/profile/user";
              formData.append("userId", String(createdUserReponse.data?.createUser?.id));
              formData.append("profile", image);
              const config = {
                baseURL: "http://localhost:3000",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              };

              const responseUpload = await axios.post(url, formData, config);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      } else {
        console.log("Corrija alguns campos antes de enviar a requisição.");
      }
    },
    [profileImage, userName, name, email, phone, password, confirmPassword]
  );

  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <form action="post" onSubmit={(event) => event.preventDefault()}>
            <section>
              <Profile
                id="profile"
                name="profile"
                htmlFor="profile"
                src={profileImage}
                srcDefault={profileImgDefault}
                onChangeCallBack={handleChangeProfileCallBack}
              />
            </section>
            <section>
              <TextInput
                id="user"
                name="user"
                htmlFor="user"
                label="Usuário"
                value={userName}
                onChangeCallBack={handleChangeUserNameCallBack}
              />
              <TextInput
                id="name"
                name="name"
                htmlFor="name"
                label="Nome"
                value={name}
                onChangeCallBack={handleChangeNameCallBack}
              />
            </section>
            <section>
              <TextInput
                id="email"
                name="email"
                htmlFor="email"
                type="email"
                label="E-mail"
                value={email}
                onChangeCallBack={handleChangeEmailCallBack}
              />
              <TextInput
                id="phone"
                name="phone"
                htmlFor="phone"
                label="Telefone"
                value={phone}
                onChangeCallBack={handleChangePhoneCallBack}
              />
            </section>
            <section>
              <PasswordInput
                id="password"
                name="password"
                htmlFor="password"
                label="Senha"
                value={password}
                onChangeCallBack={handleChangePasswordCallBack}
              />
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                htmlFor="confirmPassword"
                label="Confirmar senha"
                type="text"
                value={confirmPassword}
                onChangeCallBack={handleChangeConfirmPasswordCallBack}
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

export default NewUser;
