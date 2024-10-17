import Menu from "./components/Menu";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import AddCategory from "./pages/AddCategory";
import FrontPage from "./pages/FrontPage";
import Budget from "./pages/Budget";
import Profile from "./pages/Profile";
import AddExpenses from "./pages/AddExpenses";
import Savings from "./pages/Savings";

export default function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addexpenses" element={<AddExpenses />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </div>
  );
}
