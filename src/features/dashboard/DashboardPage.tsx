import { motion } from 'framer-motion';
import {
  FileText,
  FlaskConical,
  Bell,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GlassCard } from '@/components/ui/GlassCard';
import { CountdownTimer } from '@/components/CountdownTimer';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { Button } from '@/components/ui/Button';
import { dashboardApi } from '@/api/dashboard';
import type { DashboardSummary, DisclosureWindow, PaginatedResponse } from '@/types/models';

function MetricCard({
  icon: Icon,
  label,
  value,
  sublabel,
}: {
  icon: typeof FileText;
  label: string;
  value: number | string;
  sublabel?: string;
}) {
  return (
    <GlassCard className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-600">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
          {label}
        </p>
        <p className="text-2xl font-bold text-navy-900">{value}</p>
        {sublabel && (
          <p className="text-xs text-navy-500">{sublabel}</p>
        )}
      </div>
    </GlassCard>
  );
}

function DisclosureCard({ window: dw }: { window: DisclosureWindow }) {
  return (
    <GlassCard
      variant={dw.daysRemaining <= 7 ? 'saffron' : 'default'}
      className="flex items-center justify-between"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-navy-800">
          Paper #{dw.paperId} Disclosure
        </p>
        <p className="text-xs text-navy-400">
          {dw.daysRemaining} days remaining
        </p>
      </div>
      <Link
        to={`/papers/${dw.paperId}`}
        className="shrink-0 text-saffron-600 hover:text-saffron-700"
      >
        <ArrowRight className="h-5 w-5" />
      </Link>
    </GlassCard>
  );
}

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } =
    useQuery<DashboardSummary>({
      queryKey: ['dashboard-summary'],
      queryFn: dashboardApi.summary,
    });

  const { data: windows } = useQuery<PaginatedResponse<DisclosureWindow>>({
    queryKey: ['disclosure-windows', 'CLOSING_SOON'],
    queryFn: () => dashboardApi.disclosureWindows('CLOSING_SOON'),
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">
          TTO Dashboard
        </h1>
        <p className="mt-1 text-sm text-navy-500">
          Overview of your institution&apos;s scanning activity
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {summaryLoading ? (
          <SkeletonLoader variant="card" count={4} />
        ) : (
          <>
            <MetricCard
              icon={FileText}
              label="Papers Scanned"
              value={summary?.totalPapersScanned ?? 0}
            />
            <MetricCard
              icon={FlaskConical}
              label="Molecules Extracted"
              value={summary?.totalMoleculesExtracted ?? 0}
            />
            <MetricCard
              icon={Bell}
              label="Novel Molecules"
              value={summary?.novelMoleculesFound ?? 0}
              sublabel="Potential patent candidates"
            />
            <MetricCard
              icon={AlertTriangle}
              label="Urgent Disclosures"
              value={summary?.urgentDisclosures ?? 0}
              sublabel="Closing within 30 days"
            />
          </>
        )}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-800">
              Closing Disclosure Windows
            </h2>
            <Link
              to="/alerts"
              className="text-xs font-semibold text-saffron-600 hover:text-saffron-700"
            >
              View all alerts
            </Link>
          </div>

          <div className="space-y-3">
            {windows?.content?.length === 0 && (
              <GlassCard>
                <p className="text-sm text-navy-400">
                  No disclosure windows closing soon.
                </p>
              </GlassCard>
            )}
            {windows?.content?.map((dw) => (
              <DisclosureCard key={dw.id} window={dw} />
            ))}
            {!windows && <SkeletonLoader variant="card" count={2} />}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 text-lg font-bold text-navy-800">
            Most Urgent
          </h2>
          {windows?.content && windows.content.length > 0 && (
            <CountdownTimer
              deadline={windows.content[0]!.deadline}
              daysRemaining={windows.content[0]!.daysRemaining}
              label="Section 31 Deadline"
            />
          )}
          {!windows && <SkeletonLoader variant="card" />}

          <div className="mt-4">
            <Link to="/papers/upload">
              <Button variant="primary" size="lg" className="w-full">
                Upload New Paper
              </Button>
            </Link>
          </div>

          <div className="mt-3">
            <Link to="/papers">
              <Button variant="secondary" size="lg" className="w-full">
                View All Papers
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
