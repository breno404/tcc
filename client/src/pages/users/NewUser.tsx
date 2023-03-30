import Breadcrumb from "@/components/Breadcrumb";
import styled from "styled-components";
import profileImgDefault from "@/assets/profile.webp";
import { useCallback, useState } from "react";

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
  }
`;

const StyledInput = styled.fieldset`
  flex: 1;
  margin: 1rem 0 0 1rem;
  padding: 0 1rem 1rem 0;

  & input[type="text"] {
    height: 3rem;
    border: 1px solid #dedede;
    outline: none;
    padding: 0 5px;
  }

  & input[type="text"]:focus {
    border: 1px solid #4da6ff;
  }
`;

const StyledProfile = styled.fieldset`
  & input[type="file"] {
    display: none;
  }

  & .profile {
    max-width: 150px;
    max-height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #dee2e6;
  }

  & .profile img {
    max-width: 100%;
  }
`;

type InputProps = {
  htmlFor: string;
  onChange: (event: any) => {};
  id: string;
  value: string | number;
  label: string;
};

const Input = ({ htmlFor, onChange, id, name, value, label }: any) => {
  return (
    <StyledInput>
      <label htmlFor={htmlFor}>
        <p>{label}</p>
        <input
          id={id}
          name={name}
          type="text"
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

function NewUser(): JSX.Element {
  const [profileImage, setpProfileImage] = useState(profileImgDefault);

  const handleChangeProfilePhoto = useCallback(
    (event: any) => {
      if (event.target.files) {
        const [photo] = event.target.files;

        setpProfileImage(URL.createObjectURL(photo));
      }
    },
    [profileImage]
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
                value={""}
              />
              <Input
                id="name"
                name="name"
                htmlFor="name"
                label="Nome"
                value={""}
              />
            </section>
            <section>
              <Input
                id="email"
                name="email"
                htmlFor="email"
                label="E-mail"
                value={""}
              />
              <Input
                id="phone"
                name="phone"
                htmlFor="phone"
                label="Telefone"
                value={""}
              />
            </section>
            <section>
              <Input
                id="password"
                name="password"
                htmlFor="password"
                label="Senha"
                value={""}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                htmlFor="confirmPassword"
                label="Confirmar senha"
                value={""}
              />
            </section>
          </form>
        </div>
      </Style>
    </>
  );
}

export default NewUser;
