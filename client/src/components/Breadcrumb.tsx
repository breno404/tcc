import React, { useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const Style = styled.nav<{ mode: "main" | "light" | "dark" }>`
  width: 100%;
  height: 5rem;
  background-color: ${({ theme, mode }: any) =>
    theme[mode].quinary.backgroundColor};
  color: ${({ theme, mode }: any) => theme[mode].quinary.textColor};
  font-size: ${({ theme }: any) => theme.fontSizes.medium};
  font-family: ${({ theme }: any) => theme.fonts["sans-serif"]};
  margin-bottom: 2rem;

  & > ol {
    display: flex;
    align-items: center;
    height: 100%;
  }

  & > ol > li {
    margin-left: 1rem;
    margin-right: 1rem;
    cursor: default;
    color: #e8e9eb;
  }

  & > ol > li > a {
    cursor: pointer;
  }

  & a,
  a:active,
  a:visited {
    text-decoration: none;
    color: ${({ theme, mode }: any) => theme[mode].quinary.textColor};
  }

  & a:hover {
    text-decoration: underline;
  }
`;

function Breadcrumb(props: any): JSX.Element {
  const loaderData = useLoaderData() as any;

  function renderBreadcrumb(separator?: string | JSX.Element) {
    const { breadcrumb: data }: any = loaderData;

    const links: JSX.Element[] = data.routes.map(
      (route: { name: string; href: string }, index: number) => {
        if (index < data.routes.length - 1)
          return (
            <li key={route.name + "-link"}>
              <Link to={route.href}>{route.name}</Link>
            </li>
          );
        else return <li key={route.name + "-link"}>{route.name}</li>;
      }
    );

    if (!separator) {
      return (
        <Style aria-label="breadcrumb" mode="main">
          <ol>{links}</ol>
        </Style>
      );
    } else {
      let linksWithSeparator: (JSX.Element | string)[] = [];

      for (let [index, el] of Object.entries(links)) {
        if (typeof separator !== "string") {
          const Separator = React.cloneElement(separator, {
            key: el.key + "separator",
          });
          linksWithSeparator[parseInt(index) + 1] = Separator;
        } else linksWithSeparator[parseInt(index) + 1] = separator;
        linksWithSeparator[parseInt(index) * 2] = el;
      }

      if (linksWithSeparator.length % 2 === 0) {
        linksWithSeparator.pop();
      }

      return (
        <Style aria-label="breadcrumb" mode="main">
          <ol>{linksWithSeparator}</ol>
        </Style>
      );
    }
  }

  return <nav>{renderBreadcrumb(React.createElement("p", {}, "/"))}</nav>;
}

export default Breadcrumb;
