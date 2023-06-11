import Breadcrumb from "@/components/Breadcrumb";
import styled from "styled-components";
import {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TextInput from "@/components/inputs/TextInput";
import validate from "@/helpers/validate";
import { useQuery, useMutation } from "@apollo/client";
import {
  products as productsQuery,
  suppliers as suppliersQuery,
  createPurchase as createPurchaseMutation,
} from "@/graphQL/index";
import axios, { AxiosRequestConfig } from "axios";

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

type PurchaseMutationResponse = {
  supplier: {
    id?: string;
    companyName?: string;
    fantasyName?: string;
    cnae?: string;
    entityType?: string;
    cnpj?: string;
    cep?: string;
    district?: string;
    street?: string;
    streetNumber?: string;
    city?: string;
    phone?: string;
    email?: string;
  };
};

function Purchase(): JSX.Element {
  //------------------------------------------------------------
  const { data: products } = useQuery(productsQuery([]));
  const [product, setProduct] = useState(0);
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { data: suppliers } = useQuery(suppliersQuery([]));
  const [supplier, setSupplier] = useState(0);
  const [date, setDate] = useState("");

  const handleChangeProductCallBack = (value: string) => {
    setProduct(Number(value));
  };
  const handleChangeValueCallBack = (value: string) => {
    setValue(Number(value));
  };
  const handleChangeQuantityCallBack = (value: string) => {
    setQuantity(Number(value));
  };
  const handleChangeSupplierCallBack = (value: string) => {
    setSupplier(Number(value));
  };
  const handleChangeDateCallBack = (value: string) => {
    setDate(value);
  };

  const handleClearForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setProduct(0);
    setValue(0);
    setQuantity(0);
    setSupplier(0);
    setDate("");
  };

  const handleSubmitData = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      let valid = true;

      let validProduct = product > 0;
      let validValue = value > 0;
      let validQuantity = quantity > 0;
      let validSupplier = supplier > 0;
      let validDate = validate.exists(date);

      if (
        !validProduct ||
        !validValue ||
        !validQuantity ||
        !validSupplier ||
        !validDate
      ) {
        valid = false;
      }

      if (valid) {
        (async () => {
          let url = "/graphql";
          const mutation = useMutation(
            createPurchaseMutation([
              "id",
              "price",
              "quantity",
              "productId",
              "supplierId",
              "purchaseDate",
            ]),
            {
              variables: {
                product,
                value,
                quantity,
                supplier,
                date,
              },
            }
          );
        })();
      }
    },
    [product, value, quantity, supplier, date]
  );

  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <form action="post" onSubmit={(event) => event.preventDefault()}>
            <section>
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
                    value={product}
                    onChangeCallBack={handleChangeProductCallBack}
                  />
                  <TextInput
                    id="fantasyName"
                    name="fantasyName"
                    htmlFor="fantasyName"
                    label="Nome Fantasia"
                    value={value}
                    onChangeCallBack={handleChangeValueCallBack}
                  />
                </section>
                <section>
                  <TextInput
                    id="entityType"
                    name="entityType"
                    htmlFor="entityType"
                    label="Natureza Jurídica"
                    value={quantity}
                    onChangeCallBack={handleChangeQuantityCallBack}
                  />
                  <TextInput
                    id="cnae"
                    name="cnae"
                    htmlFor="cnae"
                    label="CNAE"
                    value={supplier}
                    onChangeCallBack={handleChangeSupplierCallBack}
                  />
                </section>
                <section>
                  <TextInput
                    id="email"
                    name="email"
                    htmlFor="email"
                    type="email"
                    label="E-mail"
                    value={date}
                    onChangeCallBack={handleChangeDateCallBack}
                  />
                </section>
              </section>
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

export default Purchase;
