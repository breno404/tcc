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

const StyledSelect = styled.fieldset`
  flex: 1;
  margin: 1rem 0 0 1rem;
  padding: 0 1rem 1rem 0;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & select {
    height: 3rem;
    width: 18rem;
    border: 1px solid #dedede;
    outline: none;
    padding: 0 5px;
    border-radius: 5px;
  }

  & select:focus {
    border: 1px solid #4da6ff;
  }
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

function Purchase(): JSX.Element {
  //------------------------------------------------------------
  const { data: productsResponse } = useQuery(productsQuery(["id", "name"]));
  const [product, setProduct] = useState(0);
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const { data: suppliersResponse } = useQuery(
    suppliersQuery(["id", "companyName"])
  );
  const [supplier, setSupplier] = useState(0);
  const [date, setDate] = useState("");
  const [mutation, { data: createdPurchase, error: createPurchaseError }] =
    useMutation(
      createPurchaseMutation([
        "id",
        "price",
        "quantity",
        "productId",
        "supplierId",
        "purchaseDate",
      ])
    );

  const totalValue = (
    Number(quantity) * Number(value.replaceAll(",", "."))
  ).toLocaleString("pt-br", {
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleChangeProductCallBack = (value: string) => {
    setProduct(Number(value));
  };
  const handleChangeValueCallBack = (value: string) => {
    setValue(value);
  };
  const handleChangeQuantityCallBack = (value: string) => {
    setQuantity(value);
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
    setValue("");
    setQuantity("");
    setSupplier(0);
    setDate("");
  };

  const handleSubmitData = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      let valid = true;

      let validProduct = product > 0;
      let validValue = Number(value.replaceAll(",", ".")) > 0;
      let validQuantity = Number(quantity.replaceAll(",", ".")) > 0;
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
        mutation({
          variables: {
            data: {
              product,
              value,
              quantity,
              supplier,
              date,
            },
          },
        });
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
                  <StyledSelect>
                    <label htmlFor="product">
                      <p>Produto</p>
                      <select
                        id="product"
                        name="product"
                        value={product}
                        onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                          const value = evt.target.value;

                          handleChangeProductCallBack(value);
                        }}
                      >
                        <option value="0">--</option>
                        {productsResponse?.products &&
                          productsResponse?.products.length > 0 &&
                          productsResponse?.products.map((p: any) => (
                            <option value={p.id}>{p.name}</option>
                          ))}
                      </select>
                    </label>
                  </StyledSelect>

                  <StyledSelect>
                    <label htmlFor="supplier">
                      {" "}
                      <p>Fornecedor</p>
                      <select
                        id="supplier"
                        name="supplier"
                        value={supplier}
                        onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                          const value = evt.target.value;

                          handleChangeSupplierCallBack(value);
                        }}
                      >
                        <option value="0">--</option>
                        {suppliersResponse?.suppliers &&
                          suppliersResponse?.suppliers.length > 0 &&
                          suppliersResponse?.suppliers.map((s: any) => (
                            <option value={s.id}>{s.companyName}</option>
                          ))}
                      </select>
                    </label>
                  </StyledSelect>
                </section>
                <section>
                  <TextInput
                    id="quantity"
                    name="quantity"
                    htmlFor="quantity"
                    label="Quantidade"
                    value={quantity}
                    onChangeCallBack={handleChangeQuantityCallBack}
                  />
                  <TextInput
                    id="price"
                    name="price"
                    htmlFor="price"
                    label="Preço"
                    value={value}
                    onChangeCallBack={handleChangeValueCallBack}
                  />
                </section>
                <section>
                  <TextInput
                    id="purchaseDate"
                    name="purchaseDate"
                    htmlFor="purchaseDate"
                    type="date"
                    label="Data da compra"
                    value={date}
                    onChangeCallBack={handleChangeDateCallBack}
                  />
                  <TextInput
                    id="totalValue"
                    name="totalValue"
                    htmlFor="totalValue"
                    type="text"
                    label="Valor total"
                    value={totalValue}
                    onChangeCallBack={() => {}}
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
