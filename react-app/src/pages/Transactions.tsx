import React from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "../hooks/useCategories";
import { useFilter } from "../hooks/useFilter";
import { Link } from "react-router-dom";
import "../styles/Transactions.css";

const Transactions: React.FC = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const { categories } = useCategories();
  const { filteredTransactions, setSearchTerm, setCategoryFilter, filterState } =
    useFilter(transactions);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.color || "#999";
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      await deleteTransaction(id);
    }
  };

  return (
    <div className="transactions">
      <h1>Transactions</h1>

      <div className="filters">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by title..."
          value={filterState.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="category-filter"
          value={filterState.categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredTransactions.length > 0 ? (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>
                  <span
                    className="category-badge"
                    style={{ backgroundColor: getCategoryColor(transaction.categoryId) }}
                  >
                    {getCategoryName(transaction.categoryId)}
                  </span>
                </td>
                <td className={transaction.type === "income" ? "positive" : "negative"}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </td>
                <td>{transaction.type}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="actions">
                  <Link
                    to={`/edit-transaction/${transaction.id}`}
                    className="btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
