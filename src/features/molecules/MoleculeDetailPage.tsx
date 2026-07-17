import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  ArrowLeft,
  FlaskConical,
  AlertTriangle,
  FileText,
  Clock,
  Sigma,
  Beaker,
  Scale,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CountdownTimer } from '@/components/CountdownTimer';
import { MoleculeRenderer } from '@/components/MoleculeRenderer';
import { NoveltyGauge } from '@/components/NoveltyGauge';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { Input } from '@/components/ui/Input';
import {
  useDisclosureWindows,
  useStartDisclosureWindow,
} from '@/hooks/useDisclosureWindow';
import { moleculesApi } from '@/api/molecules';
import type { Molecule, DisclosureWindow } from '@/types/models';

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FlaskConical;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-400">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-navy-800">{value}</p>
      </div>
    </div>
  );
}

export default function MoleculeDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: molecule, isLoading } = useQuery<Molecule>({
    queryKey: ['molecule', id],
    queryFn: () => moleculesApi.getById(id!),
    enabled: !!id,
  });

  const { data: windows } = useDisclosureWindows();

  const disclosureWindow = windows?.content?.find((w) => String(w.paperId) === String(molecule?.paperId));
  const { mutate: startWindow, isPending: startingWindow } =
    useStartDisclosureWindow();

  const [showPatentModal, setShowPatentModal] = useState(false);
  const [patentOffice, setPatentOffice] = useState('Indian Patent Office');
  const [filingDate, setFilingDate] = useState(new Date().toISOString().split('T')[0]);
  const [appNumber, setAppNumber] = useState('');

  const { mutate: recordFiling, isPending: filingPatent } = useMutation({
    mutationFn: (req: { patentOffice: string; filingDate?: string; applicationNumber?: string }) =>
      moleculesApi.filePatent(id!, req),
    onSuccess: () => {
      setShowPatentModal(false);
      alert('Provisional patent filed successfully!');
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 md:p-10">
        <SkeletonLoader variant="card" count={3} />
      </div>
    );
  }

  if (!molecule) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <GlassCard className="text-center">
          <FlaskConical className="mx-auto mb-3 h-10 w-10 text-navy-300" />
          <p className="text-sm font-medium text-navy-500">
            Molecule not found
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          to={`/papers/${molecule.paperId}`}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-navy-500 hover:text-navy-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to paper
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-6 lg:grid-cols-5"
      >
        <div className="lg:col-span-3">
          <GlassCard className="text-center">
            <h1 className="mb-2 text-xl font-bold text-navy-900 md:text-2xl">
              {molecule.iupacName ?? 'Unnamed Molecule'}
            </h1>
            {molecule.commonName && (
              <p className="mb-4 text-sm text-navy-400">
                aka {molecule.commonName}
              </p>
            )}

            <div className="flex justify-center">
              <MoleculeRenderer
                smiles={molecule.smiles}
                width={320}
                height={320}
              />
            </div>

            <p className="mt-3 text-xs font-mono text-navy-400 break-all">
              SMILES: {molecule.smiles}
            </p>
          </GlassCard>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <GlassCard className="text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy-400">
                Novelty Score
              </p>
              <NoveltyGauge score={molecule.noveltyScore} size="lg" />
              <div className="mt-4 space-y-2 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">Tanimoto Similarity</span>
                  <span className="font-semibold text-navy-800">
                    {(molecule.tanimotoSimilarity * 100).toFixed(1)}%
                  </span>
                </div>
                {molecule.closestKnownMatch && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-500">Closest Match</span>
                    <span className="text-right text-xs font-semibold text-navy-800">
                      {molecule.closestKnownMatch}
                    </span>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-navy-400">
                Properties
              </h2>
              <div className="space-y-3">
                <InfoRow
                  icon={Sigma}
                  label="Formula"
                  value={molecule.molecularFormula}
                />
                <InfoRow
                  icon={Scale}
                  label="Weight"
                  value={`${molecule.molecularWeight.toFixed(2)} g/mol`}
                />
                <InfoRow
                  icon={Beaker}
                  label="Confidence"
                  value={`${(molecule.confidenceScore * 100).toFixed(0)}%`}
                />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <GlassCard
          variant={
            disclosureWindow?.daysRemaining != null &&
            disclosureWindow.daysRemaining <= 7
              ? 'saffron'
              : 'default'
          }
        >
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-600">
              <Clock className="h-7 w-7" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-navy-800">
                Section 31 Patent Disclosure Window
              </h2>
              <p className="mt-1 text-sm text-navy-500">
                India&apos;s patent law grants a 12-month grace period from
                first disclosure. Once this window closes, patent rights may
                be forfeited.
              </p>
            </div>

            <div className="w-full shrink-0 md:w-72">
              {disclosureWindow ? (
                <CountdownTimer
                  deadline={disclosureWindow.deadlineDate}
                  daysRemaining={disclosureWindow.daysRemaining}
                  label="Grace Period Remaining"
                />
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  loading={startingWindow}
                  onClick={() => startWindow(molecule.id)}
                  className="w-full"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Start Countdown
                </Button>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-4"
      >
        <Link to={`/papers/${molecule.paperId}`}>
          <Button variant="secondary">
            <FileText className="h-4 w-4" />
            View Source Paper
          </Button>
        </Link>
        {molecule.noveltyScore >= 0.8 && (
          <Button variant="primary" onClick={() => setShowPatentModal(true)}>
            <AlertTriangle className="h-4 w-4" />
            File Provisional Patent
          </Button>
        )}
      </motion.div>

      {/* File Patent Modal */}
      {showPatentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/65 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <GlassCard variant="strong">
              <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4">
                Record Patent Filing
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="modal-patentOffice" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-400">
                    Patent Office
                  </label>
                  <select
                    id="modal-patentOffice"
                    value={patentOffice}
                    onChange={(e) => setPatentOffice(e.target.value)}
                    className="glass w-full rounded-xl px-4 py-2.5 text-sm text-navy-900 dark:text-white bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-100 cursor-pointer"
                  >
                    <option value="Indian Patent Office" className="text-navy-950 dark:text-white dark:bg-zinc-900">Indian Patent Office (IPO)</option>
                    <option value="USPTO" className="text-navy-950 dark:text-white dark:bg-zinc-900">USPTO (United States)</option>
                    <option value="EPO" className="text-navy-950 dark:text-white dark:bg-zinc-900">EPO (Europe)</option>
                    <option value="WIPO" className="text-navy-950 dark:text-white dark:bg-zinc-900">WIPO (PCT)</option>
                  </select>
                </div>

                <Input
                  id="modal-filingDate"
                  label="Filing Date"
                  type="date"
                  value={filingDate}
                  onChange={(e) => setFilingDate(e.target.value)}
                  className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />

                <Input
                  id="modal-appNumber"
                  label="Application Number"
                  type="text"
                  placeholder="e.g. TEMP/2026/123456"
                  value={appNumber}
                  onChange={(e) => setAppNumber(e.target.value)}
                  className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setShowPatentModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  loading={filingPatent}
                  onClick={() =>
                    recordFiling({
                      patentOffice,
                      filingDate,
                      applicationNumber: appNumber || undefined,
                    })
                  }
                >
                  Record Filing
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
