import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Transaction History</h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {sortedTransactions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No transactions yet. Add your first transaction above.
          </div>
        ) : (
          sortedTransactions.map(transaction => (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ArrowDownCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-red-500">
                  -${transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;