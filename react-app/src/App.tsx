import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext";
import { CategoryProvider } from "./context/CategoryContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddEditTransaction from "./pages/AddEditTransaction";
import Categories from "./pages/Categories";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <TransactionProvider>
      <CategoryProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/add-transaction" element={<AddEditTransaction />} />
              <Route path="/edit-transaction/:id" element={<AddEditTransaction />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Routes>
        </Router>
      </CategoryProvider>
    </TransactionProvider>
  );
};

export default App;
