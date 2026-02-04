import { BudgetRange } from './types';

export const BUDGET_RANGES: BudgetRange[] = [
  {
    id: 'budget-20-25',
    label: '$20 - $25',
    min: 20,
    max: 25,
    description: 'Quality essentials for your event',
  },
  {
    id: 'budget-25-40',
    label: '$25 - $40',
    min: 25,
    max: 40,
    description: 'Premium selection with variety',
  },
  {
    id: 'budget-40-plus',
    label: '$40+',
    min: 40,
    max: 100,
    description: 'Full-service luxury catering',
  },
];

export function getBudgetRangeById(id: string): BudgetRange | undefined {
  return BUDGET_RANGES.find((b) => b.id === id);
}

export function formatBudgetRange(budget: BudgetRange): string {
  if (budget.isCustom) {
    return 'Custom';
  }
  return `$${budget.min} - $${budget.max}`;
}

export function isWithinBudget(
  perPersonCost: number,
  budget: BudgetRange | null,
  customBudget: number | null
): boolean {
  if (!budget) return true;

  const maxBudget = budget.isCustom && customBudget ? customBudget : budget.max;
  return perPersonCost <= maxBudget;
}

export function getBudgetStatus(
  perPersonCost: number,
  budget: BudgetRange | null,
  customBudget: number | null
): 'under' | 'on-track' | 'over' {
  if (!budget) return 'on-track';

  const minBudget = budget.isCustom && customBudget ? customBudget * 0.8 : budget.min;
  const maxBudget = budget.isCustom && customBudget ? customBudget : budget.max;

  if (perPersonCost < minBudget) return 'under';
  if (perPersonCost > maxBudget) return 'over';
  return 'on-track';
}
