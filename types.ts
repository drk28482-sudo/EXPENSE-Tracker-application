export type Category = 
  | 'Food' 
  | 'Transport' 
  | 'Rent' 
  | 'Shopping' 
  | 'Bills' 
  | 'Education' 
  | 'Health' 
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO Date string YYYY-MM-DD
}

export interface ExpenseSummary {
  total: number;
  monthlyTotal: number;
  dailyTotal: number;
  highestCategory: Category | null;
  highestCategoryAmount: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyData {
  name: string;
  amount: number;
}
