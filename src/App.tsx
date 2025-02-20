import React, { useState } from 'react';
import { Transaction, Budget } from './types';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import BudgetForm from './components/BudgetForm';
import TransactionList from './components/TransactionList';
import MonthlyChart from './components/MonthlyChart';
import { Wallet } from 'lucide-react';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Healthcare',
  'Other'
];

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID()
    };
    setTransactions([...transactions, transaction]);
  };

  const handleAddBudget = (newBudget: Budget) => {
    setBudgets(prev => {
      const existing = prev.findIndex(b => b.category === newBudget.category);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newBudget;
        return updated;
      }
      return [...prev, newBudget];
    });
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Forms Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <BudgetForm onAddBudget={handleAddBudget} categories={CATEGORIES} />
          </div>

          {/* Dashboard */}
          <Dashboard transactions={transactions} budgets={budgets} />

          {/* Monthly Chart */}
          <MonthlyChart transactions={transactions} />

          {/* Transaction List */}
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}

export default App;