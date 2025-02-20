import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction, Budget } from '../types';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
}

const COLORS = ['#94A3B8', '#FCA5A5', '#86EFAC', '#93C5FD', '#FDE68A', '#DDD6FE', '#FDBA74'];
const PASTEL_BG = 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

const Dashboard: React.FC<DashboardProps> = ({ transactions, budgets }) => {
  // Category-wise breakdown
  const categoryTotals = transactions.reduce((acc: { [key: string]: number }, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  // Budget vs Actual
  const budgetComparison = budgets.map(budget => {
    const spent = categoryTotals[budget.category] || 0;
    const remaining = budget.amount - spent;
    const percentage = (spent / budget.amount) * 100;
    
    return {
      category: budget.category,
      spent,
      budget: budget.amount,
      remaining,
      percentage,
    };
  });

  // Spending insights
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const overBudgetCategories = budgetComparison.filter(b => b.spent > b.budget);
  const underBudgetCategories = budgetComparison.filter(b => b.spent < b.budget * 0.5);

  return (
    <div className={`${PASTEL_BG} p-6 rounded-lg shadow-md space-y-8`}>
      {/* Category Breakdown */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget vs Actual */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Budget vs Actual</h2>
        <div className="space-y-4">
          {budgetComparison.map(item => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.category}</span>
                <div className="text-sm">
                  <span className={item.remaining < 0 ? 'text-red-500' : 'text-green-500'}>
                    ${item.spent.toFixed(2)}
                  </span>
                  {' / '}
                  <span className="text-gray-600">${item.budget.toFixed(2)}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    item.percentage > 100 ? 'bg-red-400' : 'bg-blue-400'
                  }`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Total Budget</p>
                <p className="text-2xl font-bold">${totalBudget.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">Total Spent</p>
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Spending Alerts</h3>
          <div className="space-y-4">
            {overBudgetCategories.length > 0 && (
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <p className="font-medium text-red-600">Over Budget Categories</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {overBudgetCategories.map(cat => (
                      <li key={cat.category}>
                        {cat.category}: ${(cat.spent - cat.budget).toFixed(2)} over budget
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {underBudgetCategories.length > 0 && (
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-medium text-green-600">Under Budget Categories</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {underBudgetCategories.map(cat => (
                      <li key={cat.category}>
                        {cat.category}: ${(cat.budget - cat.spent).toFixed(2)} remaining
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;