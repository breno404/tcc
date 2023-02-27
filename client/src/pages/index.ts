import Details from "./Details";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
const pages = new Map();

pages.set("Layout", Layout());
pages.set("Home", Home());
pages.set("Details", Details());
pages.set("404", NotFound());
pages.set("Login", Login());
export default pages;
