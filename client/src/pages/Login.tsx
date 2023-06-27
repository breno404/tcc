import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  min-width: 100vw;
  min-height: 100vh;

  background-color: rgb(27, 48, 69);

  & > div {
    width: 300px;
    height: 465px;
    background-color: #fff;
    border-radius: 30px;
  }

  & div {
    display: flex;
  }
  & form {
    width: 100%;
  }

  & fieldset {
    display: flex;
    flex-direction: column;

    margin-top: 2rem;
  }

  & label {
    font-size: 1.6rem;
  }

  & input {
    border: 1px solid #cecece;
    border-radius: 5px;
    height: 3rem;
    padding-left: 1rem;
    outline: none;
    font-size: 1.4rem;
  }

  & button {
    margin-top: 2rem;
    padding: 1.4rem 2rem;
    border-radius: 5px;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <div>
        <form action="" method="post">
          <div
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div>
              <p style={{ fontSize: "2rem", fontWeight: "semibold" }}>
                Smart Sales
              </p>
            </div>
            <div>
              <fieldset>
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <fieldset>
                <label htmlFor="password"> Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </fieldset>
            </div>
            <div>
              <button
                type="submit"
                onClick={(evt) => {
                  evt.preventDefault();
                  try {
                    const formData = new FormData();

                    axios
                      .post(
                        "/authenticate",
                        { email, password },
                        {
                          baseURL: "http://localhost:3000",
                        }
                      )
                      .then((response) => {
                        if (response.status == 200) {
                          console.log(response.data);
                          const token = response.data.token;

                          localStorage.setItem("token", token);

                          navigate("/");
                        }
                      });
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
