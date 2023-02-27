import { ThemeProvider } from "styled-components";

const theme = {
  main: {
    primary: { backgroundColor: "#1B3045", textColor: "#FFFFFF" },
    secondary: { backgroundColor: "#24405C", textColor: "#FFFFFF" },
    tertiary: { backgroundColor: "#2E5073", textColor: "#FFFFFF" },
    quaternary: { backgroundColor: "#57728F", textColor: "#FFFFFF" },
    quinary: { backgroundColor: "#8196AB", textColor: "#FFFFFF" },
    white: { backgroundColor: "#FFFFFF", textColor: "#FFFFFF" },
  },
  light: {
    primary: { backgroundColor: "black", textColor: "" },
    secondary: { backgroundColor: "", textColor: "" },
    tertiary: { backgroundColor: "black", textColor: "" },
    quaternary: { backgroundColor: "", textColor: "" },
    quinary: { backgroundColor: "black", textColor: "" },
  },
  dark: {
    primary: { backgroundColor: "black", textColor: "" },
    secondary: { backgroundColor: "", textColor: "" },
    tertiary: { backgroundColor: "black", textColor: "" },
    quaternary: { backgroundColor: "", textColor: "" },
    quinary: { backgroundColor: "black", textColor: "" },
  },
  fonts: { "sans-serif": "sans-serif", Roboto: "Roboto" },
  fontSizes: {
    small: "1rem",
    medium: "2rem",
    large: "3rem",
  },
};

const Theme = ({ children }: { children: React.ReactElement }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
