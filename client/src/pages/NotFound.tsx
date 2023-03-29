import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

  & > div p {
    color: #757575;
    font-weight: 100;
    width: 100%;
    font-size: 4vw;
    text-align: center;
    vertical-align: middle;
  }

  & > div p:first-child {
    font-size: 18vw;
    background-color: #02adf186;
    color: transparent;
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
  }

  & > div small {
    margin-top: 2rem;
    cursor: pointer;
    color: #00bef8;
    font-size: 1.4rem;
  }
  & > div small:hover {
    text-decoration: underline;
  }
`;

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Style>
        <div>
          <p>404</p>
          <p>Página não encontrada</p>
          <small onClick={() => navigate(-1)}>Voltar</small>
        </div>
      </Style>
    </>
  );
}

export default NotFound;
