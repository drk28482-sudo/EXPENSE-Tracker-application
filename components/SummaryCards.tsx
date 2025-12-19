import React from 'react';
import { DollarSign, Calendar, TrendingUp, Wallet } from 'lucide-react';
import { ExpenseSummary } from '../types';
import { formatCurrency } from '../utils/helpers';

interface SummaryCardsProps {
  summary: ExpenseSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Expenses */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">Total Expenses</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(summary.total)}</h3>
        </div>
        <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Wallet size={24} />
        </div>
      </div>

      {/* Monthly Total */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">This Month</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(summary.monthlyTotal)}</h3>
        </div>
        <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Calendar size={24} />
        </div>
      </div>

      {/* Daily Total */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">Today</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(summary.dailyTotal)}</h3>
        </div>
        <div className="h-12 w-12 rounded-full bg-violet-50 text-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <DollarSign size={24} />
        </div>
      </div>

      {/* Highest Category */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
        <div className="overflow-hidden">
          <p className="text-slate-500 text-sm font-medium mb-1">Top Spend</p>
          <h3 className="text-xl font-bold text-slate-800 truncate" title={summary.highestCategory || 'N/A'}>
            {summary.highestCategory || 'N/A'}
          </h3>
          <p className="text-xs text-slate-400 font-medium">{formatCurrency(summary.highestCategoryAmount)}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <TrendingUp size={24} />
        </div>
      </div>
    </div>
  );
};
