import Breadcrumb from "@/components/Breadcrumb";
import styled from "styled-components";
import profileImgDefault from "@/assets/profile.webp";
import {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import PhoneInput from "@/components/inputs/PhoneInput";
import TextInput from "@/components/inputs/TextInput";
import validate from "@/helpers/validate";
import {
  supplierById as supplierQuery,
  updateSupplier as supplierMutation,
} from "@/graphQL/index";
import { useParams } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
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
  onClick: MouseEventHandler<HTMLButtonElement>;
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
    width: 200px;
    height: 200px;
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

const CNPJCEPSection = styled.section`
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 820px) {
    flex-direction: column;
  }
`;

function UpdateSupplier(): JSX.Element {
  const token = useToken()
  const { id } = useParams();

  const { data: response } = useQuery(
    supplierQuery([
      "id",
      "companyName",
      "fantasyName",
      "cnae",
      "entityType",
      "cnpj",
      "cep",
      "district",
      "street",
      "streetNumber",
      "city",
      "phone",
      "email",
    ]),
    { variables: { id } }
  );

  const [updateSupplier] = useMutation(
    supplierMutation([
      "id",
      "companyName",
      "fantasyName",
      "cnae",
      "entityType",
      "cnpj",
      "cep",
      "district",
      "street",
      "streetNumber",
      "city",
      "phone",
      "email",
    ])
  );
  //------------------------------------------------------------
  const [profileImage, setProfileImage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [cnae, setCnae] = useState("");
  const [entityType, setEntityType] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useMemo(() => {
    const supplier = response?.supplier;

    if (supplier) {
      setCompanyName(supplier.companyName || "");
      setFantasyName(supplier.fantasyName || "");
      setCnae(supplier.cnae || "");
      setEntityType(supplier.entityType || "");
      setCnpj(supplier.cnpj || "");
      setCep(supplier.cep || "");
      setDistrict(supplier.district || "");
      setStreet(supplier.street || "");
      setStreetNumber(supplier.streetNumber || "");
      setCity(supplier.city || "");
      setPhone(supplier.phone || "");
      setEmail(supplier.email || "");
    }
  }, [response]);

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

  const handleChangeCompanyNameCallBack = (value: string) => {
    setCompanyName(value);
  };
  const handleChangeFantasyNameCallBack = (value: string) => {
    setFantasyName(value);
  };
  const handleChangeEmailCallBack = (value: string) => {
    setEmail(value);
  };
  const handleChangePhoneCallBack = (value: string) => {
    setPhone(value);
  };
  const handleChangeCnaeCallBack = (value: string) => {
    setCnae(value);
  };
  const handleChangeCnpjCallBack = (value: string) => {
    setCnpj(value);
  };
  const handleChangeEntityTypeCallBack = (value: string) => {
    setEntityType(value);
  };
  const handleChangeCepCallBack = (value: string) => {
    setCep(value);
  };
  const handleChangeDistrictCallBack = (value: string) => {
    setDistrict(value);
  };
  const handleChangeStreetCallBack = (value: string) => {
    setStreet(value);
  };
  const handleChangeStreetNumberCallBack = (value: string) => {
    setStreetNumber(value);
  };
  const handleChangeCityCallBack = (value: string) => {
    setCity(value);
  };

  const handleClearForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setProfileImage("");
    setCompanyName("");
    setFantasyName("");
    setCnae("");
    setEntityType("");
    setCnpj("");
    setCep("");
    setDistrict("");
    setStreet("");
    setStreetNumber("");
    setCity("");
    setPhone("");
    setEmail("");
  };

  const handleSubmitData = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      let valid = true;

      let validCompanyName = validate.exists(companyName);
      let validFantasyName = validate.exists(fantasyName);
      let validCnae = validate.exists(cnae);
      let validEntityType = validate.exists(entityType);
      let validCnpj = validate.exists(cnpj);
      let validCep = validate.exists(cep);
      let validDistrict = validate.exists(district);
      let validStreet = validate.exists(street);
      let validStreetNumber = validate.exists(streetNumber);
      let validCity = validate.exists(city);
      let validPhone = validate.exists(phone);
      let validEmail = validate.exists(email);
      console.log(
        !validCompanyName ||
          !validCnae ||
          !validEntityType ||
          !validCnpj ||
          !validCep ||
          !validDistrict ||
          !validStreet ||
          !validStreetNumber ||
          !validCity
      );

      if (
        !validCompanyName ||
        !validCnae ||
        !validEntityType ||
        !validCnpj ||
        !validCep ||
        !validDistrict ||
        !validEmail ||
        !validStreet ||
        !validStreetNumber ||
        !validCity ||
        !validPhone
      ) {
        valid = false;
      }

      if (valid) {
        (async () => {
          const data = {
            companyName,
            cnae,
            entityType,
            cnpj,
            cep,
            district,
            email,
            street,
            streetNumber,
            city,
            phone,
          };

          try {
            const updateSupplierResponse = await updateSupplier({
              variables: { data, id },
            });

            if (updateSupplierResponse.data && profileImage) {
              const formData = new FormData();
              const blob = await (await fetch(profileImage)).blob();
              const filename = `profile-${
                updateSupplierResponse?.data.updateSupplier.id
              }.${blob.type.split("/")[1]}`;
              const image = new File([blob], filename, {
                lastModified: new Date().getTime(),
                type: blob.type,
              });

              const url = "/upload/profile/supplier";
              formData.append(
                "supplierId",
                String(updateSupplierResponse?.data.updateSupplier.id)
              );
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
              if (responseUpload.status >= 200 && responseUpload.status < 300) {
                toast.success("Fornecedor atualizado com sucesso!");
              }
            } else {
              toast.success("Fornecedor atualizado com sucesso!");
            }
          } catch (err) {
            toast.error("Erro ao atualizar o fornecedor.");
            console.log(err);
          }
        })();
      } else {
        console.log("Corrija alguns campos antes de enviar a requisição.");
      }
    },
    [
      profileImage,
      companyName,
      cnae,
      entityType,
      cnpj,
      cep,
      district,
      email,
      street,
      streetNumber,
      city,
      phone,
    ]
  );

  return (
    <>
      <Toaster containerStyle={{ fontSize: "1.4rem" }} />
      <Breadcrumb />
      <Style>
        <div>
          <form action="post" onSubmit={(event) => event.preventDefault()}>
            <section>
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
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <section>
                  <TextInput
                    id="companyName"
                    name="companyName"
                    htmlFor="companyName"
                    label="Razão Social"
                    value={companyName}
                    onChangeCallBack={handleChangeCompanyNameCallBack}
                  />
                  <TextInput
                    id="fantasyName"
                    name="fantasyName"
                    htmlFor="fantasyName"
                    label="Nome Fantasia"
                    value={fantasyName}
                    onChangeCallBack={handleChangeFantasyNameCallBack}
                  />
                </section>
                <section>
                  <TextInput
                    id="entityType"
                    name="entityType"
                    htmlFor="entityType"
                    label="Natureza Jurídica"
                    value={entityType}
                    onChangeCallBack={handleChangeEntityTypeCallBack}
                  />
                  <TextInput
                    id="cnae"
                    name="cnae"
                    htmlFor="cnae"
                    label="CNAE"
                    value={cnae}
                    onChangeCallBack={handleChangeCnaeCallBack}
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
                    type="text"
                    onChangeCallBack={handleChangePhoneCallBack}
                  />
                </section>
              </section>
            </section>
            <section>
              <CNPJCEPSection>
                <TextInput
                  id="cnpj"
                  name="cnpj"
                  htmlFor="cnpj"
                  label="CNPJ"
                  value={cnpj}
                  onChangeCallBack={handleChangeCnpjCallBack}
                />
                <TextInput
                  id="cep"
                  name="cep"
                  htmlFor="cep"
                  label="CEP"
                  value={cep}
                  onChangeCallBack={handleChangeCepCallBack}
                />
              </CNPJCEPSection>
              <section style={{ display: "flex", flexDirection: "column" }}>
                <section>
                  <TextInput
                    id="street"
                    name="street"
                    htmlFor="street"
                    label="Logradouro"
                    value={street}
                    onChangeCallBack={handleChangeStreetCallBack}
                  />
                  <TextInput
                    id="streetNumber"
                    name="streetNumber"
                    htmlFor="streetNumber"
                    label="Nº Logradouro"
                    value={streetNumber}
                    onChangeCallBack={handleChangeStreetNumberCallBack}
                  />
                </section>
                <section>
                  <TextInput
                    id="district"
                    name="district"
                    htmlFor="district"
                    label="Bairro"
                    value={district}
                    onChangeCallBack={handleChangeDistrictCallBack}
                  />
                  <TextInput
                    id="city"
                    name="city"
                    htmlFor="city"
                    label="Municipio"
                    value={city}
                    onChangeCallBack={handleChangeCityCallBack}
                  />
                </section>
              </section>
            </section>

            <section>
              <div
                style={{ margin: "1rem 0 0 1rem", padding: "0 1rem 1rem 0" }}
              >
                <Button
                  label="Atualizar"
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

export default UpdateSupplier;
