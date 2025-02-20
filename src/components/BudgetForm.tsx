import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Budget } from '../types';

interface BudgetFormProps {
  onAddBudget: (budget: Budget) => void;
  categories: string[];
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onAddBudget, categories }) => {
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    onAddBudget({
      category,
      amount: parseFloat(amount)
    });

    setCategory(categories[0]);
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Set Category Budget</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="budget-category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="budget-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget-amount" className="block text-sm font-medium text-gray-700">
            Monthly Budget ($)
          </label>
          <input
            type="number"
            id="budget-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          <Target className="w-5 h-5" />
          Set Budget
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;