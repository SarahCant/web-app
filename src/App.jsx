import Menu from "./components/Menu";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import AddCategory from "./pages/AddCategory";
import FrontPage from "./pages/FrontPage";
import Budget from "./pages/Budget";

export default function App() {
  return (
    <div>

<Menu />
    <Routes>
    <Route path="/" element={<FrontPage/>} />
    <Route path="/budget" element={<Budget/>} />
    <Route path="/addcategory" element={<AddCategory />} />

    </Routes>
    </div>

  );
}
