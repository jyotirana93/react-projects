import PizzaForm from "./pages/pizzaForm/PizzaForm";
import PizzaStagesSection from "./pages/pizzaStagesSection/PizzaStagesSection";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <main className="main">
        <header>
          <NavLink
            to="/pizza-form"
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            Pizza Form
          </NavLink>
          <NavLink
            to="/pizza-main-page"
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            Pizza Main
          </NavLink>
        </header>

        <Routes>
          <Route path="pizza-form" element={<PizzaForm />} />
          <Route path="*" element={<Navigate to="pizza-form" />} />

          <Route path="pizza-main-page" element={<PizzaStagesSection />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
