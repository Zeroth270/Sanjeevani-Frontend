import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Shield, Users, FileText, FlaskConical } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { dashboardApi } from '@/api/dashboard';
import type { DashboardSummary } from '@/types/models';

export default function AdminInstitutionPage() {
  const { data: summary, isLoading } = useQuery<DashboardSummary>({
    queryKey: ['dashboard-summary'],
    queryFn: dashboardApi.summary,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Shield className="h-6 w-6 text-saffron-500" />
        <div>
          <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">
            Institution Admin
          </h1>
          <p className="text-sm text-navy-500">
            Usage statistics and user management
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {isLoading ? (
          <SkeletonLoader variant="card" count={4} />
        ) : (
          <>
            <GlassCard className="text-center">
              <Users className="mx-auto mb-2 h-8 w-8 text-navy-400" />
              <p className="text-2xl font-bold text-navy-900">—</p>
              <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
                Active Users
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <FileText className="mx-auto mb-2 h-8 w-8 text-navy-400" />
              <p className="text-2xl font-bold text-navy-900">
                {summary?.totalPapersScanned ?? 0}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
                Papers Scanned
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <FlaskConical className="mx-auto mb-2 h-8 w-8 text-navy-400" />
              <p className="text-2xl font-bold text-navy-900">
                {summary?.totalMoleculesExtracted ?? 0}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
                Molecules
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <Shield className="mx-auto mb-2 h-8 w-8 text-navy-400" />
              <p className="text-2xl font-bold text-navy-900">
                {summary?.novelMoleculesFound ?? 0}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
                Novel
              </p>
            </GlassCard>
          </>
        )}
      </motion.div>

      <GlassCard>
        <h2 className="mb-4 text-lg font-bold text-navy-800">User Management</h2>
        <p className="text-sm text-navy-400">
          User list and role management will be available once the backend
          admin endpoints are integrated.
        </p>
      </GlassCard>
    </div>
  );
}
