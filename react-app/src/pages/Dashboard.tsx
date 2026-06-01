import React, { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "../hooks/useCategories";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const { totalIncome, totalExpenses, totalBalance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    return {
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: balance,
    };
  }, [transactions]);

  const lastFiveTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.color || "#999";
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="summary-cards">
        <div className="card balance-card">
          <h3>Total Balance</h3>
          <p className={`amount ${totalBalance >= 0 ? "positive" : "negative"}`}>
            ${totalBalance.toFixed(2)}
          </p>
        </div>

        <div className="card income-card">
          <h3>Total Income</h3>
          <p className="amount positive">+${totalIncome.toFixed(2)}</p>
        </div>

        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p className="amount negative">-${totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        {lastFiveTransactions.length > 0 ? (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {lastFiveTransactions.map((transaction) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
