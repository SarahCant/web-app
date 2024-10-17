import Menu from "./components/Menu";
import "./css/App.css";
import AddCategory from "./pages/AddCategory";
import FrontPage from "./pages/FrontPage";

export default function App() {
  return (
    <>
      <AddCategory />
      <FrontPage />
      <Menu />
    </>
  );
}
