export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Budget {
  category: string;
  amount: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
}