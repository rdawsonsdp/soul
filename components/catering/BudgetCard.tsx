'use client';

import Card from '@/components/ui/Card';
import { BudgetRange } from '@/lib/types';

interface BudgetCardProps {
  budget: BudgetRange;
  isSelected: boolean;
  onSelect: () => void;
}

export default function BudgetCard({ budget, isSelected, onSelect }: BudgetCardProps) {
  const getBudgetIcon = (id: string) => {
    switch (id) {
      case 'budget-20-25':
        return '💵';
      case 'budget-25-40':
        return '💰';
      case 'budget-40-plus':
        return '💎';
      case 'budget-custom':
        return '✨';
      default:
        return '💵';
    }
  };

  return (
    <Card
      className={`text-center hover-lift cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-primary-brown bg-primary-brown/5'
          : 'hover:ring-2 hover:ring-accent-gold/50'
      }`}
      onClick={onSelect}
    >
      <div className="text-4xl sm:text-5xl mb-3">{getBudgetIcon(budget.id)}</div>
      <h3 className="text-xl sm:text-2xl font-bold text-primary-brown mb-2 font-display">
        {budget.label}
      </h3>
      <p className="text-sm text-charcoal/70">{budget.description}</p>
      {!budget.isCustom && (
        <p className="text-xs text-light-brown mt-2">per person</p>
      )}
    </Card>
  );
}
