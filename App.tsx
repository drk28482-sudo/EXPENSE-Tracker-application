import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpenses } from './hooks/useExpenses';
import { SummaryCards } from './components/SummaryCards';
import { DashboardCharts } from './components/DashboardCharts';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseFormModal } from './components/ExpenseFormModal';
import { Expense } from './types';

const App: React.FC = () => {
  const { 
    expenses, 
    addExpense, 
    editExpense, 
    deleteExpense, 
    summary, 
    categoryData,
    monthlyData
  } = useExpenses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddClick = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleSubmit = (expenseData: Omit<Expense, 'id'>) => {
    if (editingExpense) {
      editExpense(editingExpense.id, expenseData);
    } else {
      addExpense(expenseData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-emerald-300 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              E
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">ExpenseTracker <span className="text-primary">Pro</span></h1>
          </div>
          
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Expense</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
          <p className="text-slate-500">Track, manage, and analyze your personal finances.</p>
        </div>

        {/* Summary Stats */}
        <SummaryCards summary={summary} />

        {/* Charts Section */}
        <DashboardCharts categoryData={categoryData} monthlyData={monthlyData} />

        {/* Transactions List */}
        <ExpenseList 
          expenses={expenses} 
          onEdit={handleEditClick} 
          onDelete={deleteExpense} 
        />
      </main>

      {/* Add/Edit Modal */}
      <ExpenseFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        initialData={editingExpense}
      />
    </div>
  );
};

export default App;
