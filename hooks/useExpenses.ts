import { useState, useEffect, useMemo } from 'react';
import { Expense, ExpenseSummary, CategoryData, MonthlyData, Category } from '../types';
import { INITIAL_EXPENSES, CATEGORY_COLORS } from '../constants';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const stored = localStorage.getItem('expense-tracker-data');
      return stored ? JSON.parse(stored) : INITIAL_EXPENSES;
    } catch (error) {
      console.error("Failed to load expenses", error);
      return INITIAL_EXPENSES;
    }
  });

  useEffect(() => {
    localStorage.setItem('expense-tracker-data', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Math.random().toString(36).substr(2, 9) };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const editExpense = (id: string, updatedExpense: Partial<Expense>) => {
    setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, ...updatedExpense } : exp));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const summary = useMemo<ExpenseSummary>(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const today = now.toISOString().split('T')[0];

    let total = 0;
    let monthlyTotal = 0;
    let dailyTotal = 0;
    const categoryTotals: Record<string, number> = {};

    expenses.forEach(exp => {
      const amount = Number(exp.amount);
      total += amount;

      const expDate = new Date(exp.date);
      if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
        monthlyTotal += amount;
      }

      if (exp.date === today) {
        dailyTotal += amount;
      }

      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + amount;
    });

    let highestCategory: Category | null = null;
    let highestCategoryAmount = 0;

    Object.entries(categoryTotals).forEach(([cat, amount]) => {
      if (amount > highestCategoryAmount) {
        highestCategoryAmount = amount;
        highestCategory = cat as Category;
      }
    });

    return { total, monthlyTotal, dailyTotal, highestCategory, highestCategoryAmount };
  }, [expenses]);

  const categoryData = useMemo<CategoryData[]>(() => {
    const totals: Record<string, number> = {};
    expenses.forEach(exp => {
      totals[exp.category] = (totals[exp.category] || 0) + Number(exp.amount);
    });

    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
        color: CATEGORY_COLORS[name as Category] || '#ccc'
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const monthlyData = useMemo<MonthlyData[]>(() => {
    const data: Record<string, number> = {};
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    // Initialize with 0
    last6Months.forEach(m => data[m] = 0);

    expenses.forEach(exp => {
      const d = new Date(exp.date);
      const monthName = d.toLocaleString('default', { month: 'short' });
      if (data.hasOwnProperty(monthName)) {
        data[monthName] += Number(exp.amount);
      }
    });

    return Object.entries(data).map(([name, amount]) => ({ name, amount }));
  }, [expenses]);

  return {
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
    summary,
    categoryData,
    monthlyData
  };
};
