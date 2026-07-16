import { formatDistanceToNow, differenceInDays, format } from 'date-fns';

export function daysLeft(deadlineDate) {
  return Math.max(0, differenceInDays(new Date(deadlineDate), new Date()));
}

export function urgencyColor(days) {
  if (days <= 7) return 'text-red-400';
  if (days <= 21) return 'text-amber-400';
  return 'text-green-400';
}

export function urgencyBg(days) {
  if (days <= 7) return 'badge-urgent';
  if (days <= 21) return 'badge-pending';
  return 'badge-processed';
}

export function urgencyLabel(days) {
  if (days <= 7) return 'CRITICAL';
  if (days <= 21) return 'WARNING';
  return 'SAFE';
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  try { return format(new Date(dateStr), 'dd MMM yyyy'); } catch { return dateStr; }
}

export function timeAgo(dateStr) {
  if (!dateStr) return '';
  try { return formatDistanceToNow(new Date(dateStr), { addSuffix: true }); } catch { return ''; }
}

export function statusBadgeClass(status) {
  const map = {
    NOVEL: 'badge-novel',
    KNOWN: 'badge-known',
    PENDING: 'badge-pending',
    PROCESSED: 'badge-processed',
    FAILED: 'badge-failed',
    PROCESSING: 'badge-pending',
  };
  return map[status] || 'badge-known';
}

export function truncateSMILES(smiles, maxLen = 40) {
  if (!smiles) return '';
  return smiles.length > maxLen ? smiles.slice(0, maxLen) + '…' : smiles;
}
