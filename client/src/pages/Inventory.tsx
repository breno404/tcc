import Breadcrumb from "@/components/Breadcrumb";
import styled from "styled-components";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TextInput from "@/components/inputs/TextInput";
import validate from "@/helpers/validate";
import { useMutation, useQuery } from "@apollo/client";
import {
  products as productsQuery,
  createProduct as createProductMutation,
  updateProduct as updateProductMutation,
} from "@/graphQL/index";
import axios, { AxiosRequestConfig } from "axios";

const Style = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  border-radius: 1.2rem;

  & > div:first-child {
    overflow-x: auto;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    padding-bottom: 2rem;
    padding-right: 2rem;
    flex-shrink: 1;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
    padding-right: 2rem;
    flex-shrink: 1;
  }

  & > div:first-child table {
    font-size: 1.4rem;
    border-collapse: collapse;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin: 2rem 0 0 2rem;
    width: 100%;
    color: #000;
  }

  & > div:first-child table th {
    text-align: left;
    padding: 1.2rem 1.4rem;
    //border: 1px solid black;
  }

  & > div:first-child table td {
    text-align: left;
    padding: 1.2rem 1.4rem;
    //border: 1px solid black;
  }

  & > div:first-child table tbody tr:nth-child(2n) {
    background-color: #f6f6f6;
  }

  & > div:first-child table tbody tr:hover {
    background-color: #d8d8d8;
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

type ProductQueryResponse = {
  product: {
    id?: string;
    name: string;
    description: string;
    quantity: number;
    price: string;
    category: string;
  };
};

function Inventory(): JSX.Element {
  //------------------------------------------------------------
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const {
    loading,
    error,
    data: response,
  } = useQuery(
    productsQuery([
      "id",
      "name",
      "description",
      "quantity",
      "price",
      "category",
    ])
  );
  const [createMutation, { data: createdProduct, error: createdProductError }] =
    useMutation(
      createProductMutation([
        "id",
        "name",
        "category",
        "description",
        "price",
        "quantity",
      ])
    );
  const [updateMutation, { data: updatedProduct, error: updatedProductError }] =
    useMutation(
      updateProductMutation([
        "id",
        "name",
        "category",
        "description",
        "price",
        "quantity",
      ])
    );

  useEffect(() => {
    console.log(createdProductError);
    console.log(updatedProductError);
  }, [createdProductError, updatedProductError]);

  const totalValue = (
    Number(quantity) * Number(price.replaceAll(",", "."))
  ).toLocaleString("pt-br", {
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleChangeNameCallBack = (value: string) => {
    setName(value);
  };
  const handleChangeDescriptionCallBack = (value: string) => {
    setDescription(value);
  };
  const handleChangeCategoryCallBack = (value: string) => {
    setCategory(value);
  };

  const handleClearForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setId("");
    setName("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setCategory("");
  };

  const handleSubmitData = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      let valid = true;

      let validName = validate.exists(name);
      let validDescription = validate.exists(description);
      let validPrice = Number(price.replaceAll(",", ".")) > 0;
      let validQuantity = Number(quantity.replaceAll(",", ".")) > 0;
      let validCategory = validate.exists(category);

      if (!validName || !validDescription || !validCategory) {
        valid = false;
      }

      if (valid) {
        if (id) {
          updateMutation({
            variables: { id, data: { name, description, category } },
          });
        } else {
          createMutation({
            variables: {
              data: { name, price: 0, quantity: 0, description, category },
            },
          });
        }
      } else {
        console.log("Corrija alguns campos antes de enviar a requisição.");
      }
    },
    [id, name, description, category]
  );

  const productRows = response?.products.map((p: any, index: number) => {
    const handleClick = (evt: MouseEvent<HTMLTableRowElement>) => {
      setId(p.id);
      setName(p.name);
      setDescription(p.description);
      setCategory(p.category);
      setPrice(p.price);
      setQuantity(p.quantity);
    };

    return (
      <tr key={`${p.id}-row-${index}`} onClick={handleClick}>
        <td>{p.id}</td>
        <td>{p.name}</td>
        <td>{p.quantity}</td>
        <td>
          {Number(p.price).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td>{p.category}</td>
      </tr>
    );
  });

  return (
    <>
      <Breadcrumb />
      <Style>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>{productRows}</tbody>
          </table>
        </div>
        <div>
          <form action="post" onSubmit={(event) => event.preventDefault()}>
            <section>
              <section></section>
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
                    id="name"
                    name="name"
                    htmlFor="name"
                    label="Nome"
                    value={name}
                    onChangeCallBack={handleChangeNameCallBack}
                  />
                  <TextInput
                    id="description"
                    name="description"
                    htmlFor="description"
                    label="Descrição"
                    value={description}
                    onChangeCallBack={handleChangeDescriptionCallBack}
                  />
                </section>
                <section>
                  <TextInput
                    id="quantity"
                    name="quantity"
                    htmlFor="quantity"
                    label="Quantidade"
                    value={quantity}
                    onChangeCallBack={() => {}}
                  />
                  <TextInput
                    id="price"
                    name="price"
                    htmlFor="price"
                    label="Preço"
                    value={price}
                    onChangeCallBack={() => {}}
                  />
                </section>
                <section>
                  <TextInput
                    id="category"
                    name="category"
                    htmlFor="category"
                    label="Categoria"
                    value={category}
                    onChangeCallBack={handleChangeCategoryCallBack}
                  />
                  <TextInput
                    id="totalValue"
                    name="totalValue"
                    htmlFor="totalValue"
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

export default Inventory;
