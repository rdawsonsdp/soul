import { EventTypeConfig } from './types';

export const EVENT_TYPES: EventTypeConfig[] = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: 'Morning meetings, early events, and AM gatherings',
    icon: '🌅',
    suggestedItems: ['pastries', 'muffins', 'coffee cake', 'danishes', 'croissants'],
  },
  {
    id: 'lunch',
    name: 'Lunch',
    description: 'Midday meetings, working lunches, and afternoon events',
    icon: '☀️',
    suggestedItems: ['sandwich trays', 'salads', 'savory items', 'dessert trays'],
  },
  {
    id: 'snack',
    name: 'Snack / Break',
    description: 'Coffee breaks, afternoon treats, and light refreshments',
    icon: '🍪',
    suggestedItems: ['cookies', 'brownies', 'bars', 'mini pastries', 'cake slices'],
  },
];

export function getEventTypeConfig(id: string): EventTypeConfig | undefined {
  return EVENT_TYPES.find((et) => et.id === id);
}

export function getEventTypeName(id: string): string {
  return getEventTypeConfig(id)?.name || id;
}
