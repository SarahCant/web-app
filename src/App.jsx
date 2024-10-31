import "./css/reset.css";
import "./css/App.css";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Animation from "./components/Animation";
import Menu from "./components/Menu";
import AddCategory from "./pages/AddCategory";
import FrontPage from "./pages/FrontPage";
import Profile from "./pages/Profile";
import AddExpenses from "./pages/AddExpenses";
import Savings from "./pages/Savings";
import MakeBudget from "./pages/MakeBudget";
import MyBudget from "./pages/MyBudget";
import UpdateCategory from "./pages/UpdateCategory";
import BudgetNavigation from "./pages/BudgetNavigation";

export default function App() {
  //state to manage whether to show the loading screen
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    //check if the loading screen has been shown this session
    const hasVisited = sessionStorage.getItem("hasVisited");

    //if not, show the loading screen and set the session storage
    if (!hasVisited) {
      setShowLoading(true);
      sessionStorage.setItem("hasVisited", "true");

      //hide loading screen after 6s
      setTimeout(() => {
        setShowLoading(false);
      }, 6000);
    }
  }, []);

  return (
    <div>
      {showLoading ? (
        //show loading animation
        <Animation />
      ) : (
        //main content:
        <>
          <Menu />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addexpenses" element={<AddExpenses />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/makebudget" element={<MakeBudget />} />
            <Route path="/budgetnavigation" element={<BudgetNavigation />} />
            <Route path="/mybudget" element={<MyBudget />} />
            <Route path="/updatecategory/:id" element={<UpdateCategory />} />
          </Routes>
        </>
      )}
    </div>
  );
}
