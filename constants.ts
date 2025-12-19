import { Category, Expense } from './types';

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Rent',
  'Shopping',
  'Bills',
  'Education',
  'Health',
  'Other'
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#f59e0b',      // Amber
  Transport: '#3b82f6', // Blue
  Rent: '#ef4444',      // Red
  Shopping: '#ec4899',  // Pink
  Bills: '#6366f1',     // Indigo
  Education: '#8b5cf6', // Violet
  Health: '#10b981',    // Emerald
  Other: '#64748b'      // Slate
};

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 120.50,
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '2',
    title: 'Monthly Rent',
    amount: 1200.00,
    category: 'Rent',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '3',
    title: 'Uber to Work',
    amount: 24.00,
    category: 'Transport',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0] // Yesterday
  },
  {
    id: '4',
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'Bills',
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0]
  },
  {
    id: '5',
    title: 'New Sneakers',
    amount: 85.00,
    category: 'Shopping',
    date: new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0]
  },
  {
    id: '6',
    title: 'Dentist Appointment',
    amount: 150.00,
    category: 'Health',
    date: new Date(Date.now() - 86400000 * 15).toISOString().split('T')[0]
  }
];
