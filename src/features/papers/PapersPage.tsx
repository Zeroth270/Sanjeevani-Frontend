import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Upload, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { useDebounce } from '@/hooks/useDebounce';
import { papersApi, type PapersQueryParams } from '@/api/papers';
import { formatDate } from '@/lib/utils';
import type { Paper } from '@/types/models';

const statusBadge: Record<string, { variant: 'info' | 'success' | 'danger'; label: string }> = {
  PROCESSING: { variant: 'info', label: 'Processing' },
  COMPLETED: { variant: 'success', label: 'Completed' },
  FAILED: { variant: 'danger', label: 'Failed' },
};

function PaperRow({ paper }: { paper: Paper }) {
  const badge = statusBadge[paper.status] ?? { variant: 'info', label: paper.status };

  return (
    <Link to={`/papers/${paper.id}`}>
      <GlassCard className="flex items-center gap-4 hover:bg-white/80">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-500">
          <FileText className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-navy-900">
            {paper.title}
          </p>
          <p className="text-xs text-navy-400">
            {paper.authors?.join(', ')} &middot; {formatDate(paper.uploadedAt)}
          </p>
        </div>
        <div className="hidden items-center gap-4 text-xs text-navy-400 sm:flex">
          <span>{paper.moleculeCount} molecules</span>
          <span>{paper.novelMoleculeCount} novel</span>
        </div>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </GlassCard>
    </Link>
  );
}

export default function PapersPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebounce(search);

  const params: PapersQueryParams = {
    search: debouncedSearch || undefined,
    status: status || undefined,
    page,
    size: 15,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['papers', params],
    queryFn: () => papersApi.list(params),
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">Papers</h1>
          <p className="mt-1 text-sm text-navy-500">
            Browse and manage your scanned research papers
          </p>
        </div>
        <Link to="/papers/upload">
          <Button variant="primary">
            <Upload className="h-4 w-4" />
            Upload Paper
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="glass w-full rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-100"
          />
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(0); }}
          className="glass rounded-xl px-4 py-2.5 text-sm focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-100"
        >
          <option value="">All statuses</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
        </select>
      </motion.div>

      <div className="space-y-3">
        {isLoading && <SkeletonLoader variant="card" count={5} />}

        {data?.content.length === 0 && (
          <GlassCard className="py-12 text-center">
            <FileText className="mx-auto mb-3 h-10 w-10 text-navy-300" />
            <p className="text-sm font-medium text-navy-500">No papers found</p>
            <p className="mt-1 text-xs text-navy-400">
              Upload your first paper to get started.
            </p>
          </GlassCard>
        )}

        {data?.content.map((paper) => (
          <PaperRow key={paper.id} paper={paper} />
        ))}
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={data.first}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-xs text-navy-500">
            Page {data.number + 1} of {data.totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={data.last}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
