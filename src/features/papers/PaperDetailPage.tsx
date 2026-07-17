import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, FileText, FlaskConical } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { MoleculeRenderer } from '@/components/MoleculeRenderer';
import { papersApi } from '@/api/papers';
import { formatDate } from '@/lib/utils';
import type { Paper, Molecule } from '@/types/models';

// Simulated molecules attached to a paper
// In production, this data comes from GET /api/papers/{id}/molecules
function usePaperMolecules(paperId: string) {
  return useQuery<Molecule[]>({
    queryKey: ['paper-molecules', paperId],
    queryFn: () =>
      fetch(`/api/papers/${paperId}/molecules`).then((r) => r.json()),
    enabled: false, // placeholder — backend endpoint TBD
    placeholderData: [],
  });
}

const moleculeStatusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  NOVEL: 'success',
  UNCERTAIN: 'warning',
  KNOWN: 'danger',
};

export default function PaperDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: paper, isLoading } = useQuery<Paper>({
    queryKey: ['paper', id],
    queryFn: () => papersApi.getById(id!),
    enabled: !!id,
  });

  const { data: molecules } = usePaperMolecules(id!);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10">
        <SkeletonLoader variant="card" count={3} />
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <GlassCard className="text-center">
          <p className="text-navy-500">Paper not found</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          to="/papers"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-navy-500 hover:text-navy-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to papers
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <GlassCard>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-navy-900 md:text-2xl">
                {paper.title}
              </h1>
              <p className="mt-1 text-sm text-navy-500">
                {paper.authors?.join(', ')}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-navy-400">
                {paper.journal && <span>{paper.journal}</span>}
                {paper.doi && <span>DOI: {paper.doi}</span>}
                <span>Uploaded: {formatDate(paper.uploadedAt)}</span>
                <Badge
                  variant={
                    paper.status === 'COMPLETED'
                      ? 'success'
                      : paper.status === 'FAILED'
                        ? 'danger'
                        : 'info'
                  }
                >
                  {paper.status}
                </Badge>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="mb-4 text-lg font-bold text-navy-800">
          Extracted Molecules ({molecules?.length ?? 0})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {molecules?.map((mol, i) => (
            <motion.div
              key={mol.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/molecules/${mol.id}`}>
                <GlassCard className="group cursor-pointer text-center hover:bg-white/80">
                  <MoleculeRenderer smiles={mol.smiles} width={200} height={160} />
                  <p className="mt-3 truncate text-sm font-semibold text-navy-800">
                    {mol.iupacName ?? mol.smiles}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-3 text-xs">
                    <Badge
                      variant={moleculeStatusVariant[mol.status] ?? 'info'}
                    >
                      {mol.status}
                    </Badge>
                    <span className="text-navy-400">
                      {(mol.confidenceScore * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}

          {(!molecules || molecules.length === 0) && (
            <GlassCard className="col-span-full py-12 text-center">
              <FlaskConical className="mx-auto mb-3 h-10 w-10 text-navy-300" />
              <p className="text-sm text-navy-500">
                No molecules extracted yet
              </p>
            </GlassCard>
          )}
        </div>
      </motion.div>
    </div>
  );
}
