import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "../hooks/useCategories";
import TransactionForm from "../components/TransactionForm";
import "../styles/AddEditTransaction.css";

const AddEditTransaction: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { transactions, addTransaction, updateTransaction } = useTransactions();
  const { categories } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState(undefined);

  useEffect(() => {
    if (id) {
      const transaction = transactions.find((t) => t.id === id);
      if (transaction) {
        setInitialData(transaction);
      }
    }
  }, [id, transactions]);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (id) {
        await updateTransaction(id, data);
        alert("Transaction updated successfully!");
      } else {
        await addTransaction(data);
        alert("Transaction added successfully!");
      }
      navigate("/transactions");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-edit-transaction">
      <h1>{id ? "Edit Transaction" : "Add New Transaction"}</h1>
      <TransactionForm
        categories={categories}
        onSubmit={handleSubmit}
        initialData={initialData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AddEditTransaction;
