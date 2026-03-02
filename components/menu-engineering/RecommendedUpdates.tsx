'use client';

import { useState, useMemo } from 'react';
import ProgressBar from '@/components/ui/ProgressBar';
import RecommendationCard, { type RecommendationStatus } from './RecommendationCard';
import type { Recommendation } from '@/lib/menu-engineering';

interface RecommendedUpdatesProps {
  recommendations: Recommendation[];
}

interface RecState {
  status: RecommendationStatus;
  modifyNote: string;
}

export default function RecommendedUpdates({ recommendations }: RecommendedUpdatesProps) {
  const [states, setStates] = useState<Record<string, RecState>>(() => {
    const initial: Record<string, RecState> = {};
    for (const rec of recommendations) {
      initial[rec.id] = { status: 'pending', modifyNote: '' };
    }
    return initial;
  });

  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const updateState = (id: string, update: Partial<RecState>) => {
    setStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...update },
    }));
  };

  const reviewed = Object.values(states).filter((s) => s.status !== 'pending').length;
  const total = recommendations.length;
  const accepted = Object.values(states).filter((s) => s.status === 'accepted').length;
  const rejected = Object.values(states).filter((s) => s.status === 'rejected').length;
  const modified = Object.values(states).filter((s) => s.status === 'modified').length;

  const filteredRecs = useMemo(() => {
    return recommendations.filter((rec) => {
      const state = states[rec.id];
      if (filterPriority !== 'all' && rec.priority !== filterPriority) return false;
      if (filterStatus !== 'all' && state?.status !== filterStatus) return false;
      return true;
    });
  }, [recommendations, states, filterPriority, filterStatus]);

  const handleAcceptAllHighPriority = () => {
    setStates((prev) => {
      const next = { ...prev };
      for (const rec of recommendations) {
        if (rec.priority === 'high' && next[rec.id].status === 'pending') {
          next[rec.id] = { ...next[rec.id], status: 'accepted' };
        }
      }
      return next;
    });
  };

  const totalImpact = recommendations
    .filter((r) => states[r.id]?.status === 'accepted' || states[r.id]?.status === 'modified')
    .reduce((sum, r) => sum + r.impactAmount, 0);

  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-oswald font-semibold text-[#363333] mb-4">
        Recommended Updates
      </h2>

      {/* Progress & Summary */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div>
            <span className="text-sm text-gray-600">
              <span className="font-bold text-[#363333]">{reviewed}</span> of{' '}
              <span className="font-bold text-[#363333]">{total}</span> recommendations reviewed
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {accepted} Accepted
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              {rejected} Rejected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              {modified} Modified
            </span>
          </div>
        </div>

        <ProgressBar
          value={reviewed}
          max={total}
          showPercentage
          variant={reviewed === total ? 'success' : 'default'}
        />

        {/* Impact Summary */}
        {totalImpact > 0 && (
          <div className="mt-3 flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm text-green-800">
              Estimated monthly impact from accepted changes:{' '}
              <span className="font-bold">
                +${totalImpact >= 1000 ? `${(totalImpact / 1000).toFixed(1)}K` : totalImpact.toLocaleString()}
              </span>
              /month
            </span>
          </div>
        )}
      </div>

      {/* Filters & Batch Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#dabb64]"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#dabb64]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="modified">Modified</option>
          </select>
        </div>

        <button
          onClick={handleAcceptAllHighPriority}
          className="px-4 py-2 bg-[#363333] text-white rounded-lg text-sm font-semibold hover:bg-[#4a4747] transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Accept All High Priority
        </button>
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRecs.map((rec) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            status={states[rec.id]?.status || 'pending'}
            modifyNote={states[rec.id]?.modifyNote || ''}
            onAccept={() => updateState(rec.id, { status: 'accepted' })}
            onReject={() => updateState(rec.id, { status: 'rejected' })}
            onModify={(note) => updateState(rec.id, { status: 'modified', modifyNote: note })}
            onUndo={() => updateState(rec.id, { status: 'pending', modifyNote: '' })}
          />
        ))}
      </div>

      {filteredRecs.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No recommendations match your filters.
        </div>
      )}
    </section>
  );
}
