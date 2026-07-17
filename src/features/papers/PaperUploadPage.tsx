import { useState, useCallback, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  Sparkles,
  Atom,
  Clock,
  User
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { usePollPaper } from '@/hooks/usePollPaper';
import { papersApi } from '@/api/papers';
import { MoleculeRenderer } from '@/components/MoleculeRenderer';
import type { Paper } from '@/types/models';

export default function PaperUploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [mode, setMode] = useState<'file' | 'paste'>('file');
  const [uploading, setUploading] = useState(false);
  const [paperId, setPaperId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sourceType, setSourceType] = useState('PREPRINT');
  const [publicationDate, setPublicationDate] = useState('');

  const { data: paper } = usePollPaper(paperId ?? undefined, !!paperId);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && (dropped.type === 'application/pdf' || dropped.name.endsWith('.pdf'))) {
      setFile(dropped);
      setError(null);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'file' && !file) {
      setError('Please select a file to upload');
      return;
    }

    if (mode === 'paste' && !pasteText.trim()) {
      setError('Please paste some research text');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('sourceType', sourceType);
      if (authors.trim()) {
        formData.append('authors', authors);
      }
      if (publicationDate) {
        formData.append('publicationDate', publicationDate);
      }

      if (mode === 'file' && file) {
        formData.append('file', file);
      } else if (mode === 'paste' && pasteText.trim()) {
        formData.append('rawText', pasteText);
      }

      const result: Paper = await papersApi.upload(formData);
      setPaperId(result.id);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const molecules = (paper as any)?.molecules || [];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white md:text-3xl">
          {paperId ? 'Analyzing Paper' : 'Upload Paper'}
        </h1>
        <p className="mt-1 text-sm text-navy-500 dark:text-zinc-400">
          {paperId ? 'Analyzing document structure, extracting molecules, and verifying chemical novelty' : 'Upload a research paper or paste raw text for molecule scanning'}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!paperId ? (
          <motion.div
            key="upload-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <GlassCard variant="strong">
              <div className="mb-6 flex gap-2 rounded-xl bg-navy-50/50 dark:bg-zinc-900/50 p-1 border border-navy-100/10 dark:border-zinc-800/30">
                <button
                  onClick={() => setMode('file')}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                    mode === 'file'
                      ? 'bg-white dark:bg-zinc-800 text-navy-900 dark:text-white shadow-sm'
                      : 'text-navy-500 dark:text-zinc-400 hover:text-navy-900 dark:hover:text-white'
                  }`}
                >
                  <Upload className="mr-1.5 inline h-4 w-4" />
                  File Upload
                </button>
                <button
                  onClick={() => setMode('paste')}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                    mode === 'paste'
                      ? 'bg-white dark:bg-zinc-800 text-navy-900 dark:text-white shadow-sm'
                      : 'text-navy-500 dark:text-zinc-400 hover:text-navy-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="mr-1.5 inline h-4 w-4" />
                  Paste Text
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/20 p-3 text-xs font-medium text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    id="title"
                    label="Paper Title"
                    type="text"
                    placeholder="e.g. Synthesis of Novel Anti-malarial Agents"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  <Input
                    id="authors"
                    label="Authors"
                    type="text"
                    placeholder="e.g. Jane Doe, John Smith"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="sourceType"
                      className="mb-1.5 block text-sm font-medium text-navy-700 dark:text-zinc-300"
                    >
                      Source Type
                    </label>
                    <select
                      id="sourceType"
                      value={sourceType}
                      onChange={(e) => setSourceType(e.target.value)}
                      required
                      className="glass w-full rounded-xl px-4 py-2.5 text-sm text-navy-900 dark:text-white bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-100 transition-all cursor-pointer"
                    >
                      <option value="PREPRINT" className="text-navy-950 dark:text-white dark:bg-zinc-900">Preprint</option>
                      <option value="JOURNAL" className="text-navy-950 dark:text-white dark:bg-zinc-900">Journal</option>
                      <option value="THESIS" className="text-navy-950 dark:text-white dark:bg-zinc-900">Thesis</option>
                      <option value="CONFERENCE" className="text-navy-950 dark:text-white dark:bg-zinc-900">Conference</option>
                    </select>
                  </div>
                  <Input
                    id="publicationDate"
                    label="Publication Date"
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {mode === 'file' ? (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy-200 dark:border-zinc-800 p-10 text-center transition-colors hover:border-saffron-300 hover:bg-saffron-50/30 dark:hover:bg-zinc-900/20"
                  >
                    {!file ? (
                      <>
                        <Upload className="mb-3 h-10 w-10 text-navy-300 dark:text-zinc-600" />
                        <p className="text-sm font-medium text-navy-600 dark:text-zinc-400">
                          Drag & drop your file here
                        </p>
                        <p className="mt-1 text-xs text-navy-400 dark:text-zinc-500">
                          PDF files up to 50MB
                        </p>
                        <label className="mt-4">
                          <span className="inline-flex cursor-pointer rounded-xl bg-saffron-500 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-saffron-600">
                            Browse files
                          </span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) { setFile(f); setError(null); }
                            }}
                          />
                        </label>
                      </>
                    ) : (
                      <div className="flex w-full items-center gap-3 rounded-xl bg-navy-50 dark:bg-zinc-900 p-4">
                        <FileText className="h-8 w-8 shrink-0 text-saffron-500" />
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-medium text-navy-900 dark:text-white">
                            {file.name}
                          </p>
                          <p className="text-xs text-navy-400 dark:text-zinc-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="shrink-0 rounded-lg p-1 text-navy-400 hover:bg-navy-100 dark:hover:bg-zinc-800 hover:text-navy-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder="Paste research paper text here... Include chemical names, SMILES notations, and molecular descriptions."
                    rows={12}
                    className="glass w-full resize-none rounded-2xl p-4 text-sm leading-relaxed focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-100 dark:bg-zinc-900/30 text-navy-950 dark:text-white"
                  />
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={uploading}
                  className="w-full font-semibold shadow-emerald-500/10"
                >
                  {uploading ? 'Uploading research paper...' : 'Start RAG Molecule Scan'}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="analysis-visualizer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Real Progress Status Header */}
            <GlassCard variant="strong" className="p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Atom className="h-40 w-40 text-navy-900 dark:text-white animate-spin-slow" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider text-saffron-500 uppercase bg-saffron-500/10 px-2 py-0.5 rounded-md">
                    Scan Analysis Active
                  </span>
                  <h2 className="text-xl font-extrabold text-navy-900 dark:text-white tracking-tight">
                    {title || "Research Publication"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-400 dark:text-zinc-500">
                    {authors && (
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {authors}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Status: <strong className={paper?.status === 'COMPLETED' ? 'text-emerald-500' : 'text-saffron-500 animate-pulse'}>{paper?.status || 'PROCESSING'}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {paper?.status === 'PROCESSING' ? (
                    <div className="flex items-center gap-2 text-saffron-500 bg-saffron-500/5 border border-saffron-500/10 px-4 py-2 rounded-xl text-sm font-semibold">
                      <Activity className="h-4.5 w-4.5 animate-pulse" />
                      Extracting Conformations...
                    </div>
                  ) : paper?.status === 'COMPLETED' ? (
                    <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 px-4 py-2 rounded-xl text-sm font-semibold">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                      Analysis Completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500 bg-red-500/5 border border-red-500/10 px-4 py-2 rounded-xl text-sm font-semibold">
                      <AlertCircle className="h-4.5 w-4.5" />
                      Analysis Failed
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="h-2 w-full bg-navy-50 dark:bg-zinc-900 rounded-full overflow-hidden border border-navy-100/10 dark:border-zinc-800/30">
                  <motion.div
                    className={`h-full rounded-full ${
                      paper?.status === 'COMPLETED'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                        : paper?.status === 'FAILED'
                          ? 'bg-red-500'
                          : 'bg-gradient-to-r from-saffron-400 to-saffron-500'
                    }`}
                    initial={{ width: '5%' }}
                    animate={{ 
                      width: paper?.status === 'COMPLETED' ? '100%' : paper?.status === 'FAILED' ? '100%' : '85%' 
                    }}
                    transition={{ 
                      duration: paper?.status === 'COMPLETED' ? 1 : 12, 
                      ease: 'easeInOut' 
                    }}
                  />
                </div>
              </div>
            </GlassCard>

            {/* Extracted compounds and bonds (100% Real-time database polled) */}
            <GlassCard variant="strong" className="space-y-4">
              <div className="border-b border-navy-100/10 dark:border-zinc-800/30 pb-3">
                <h3 className="font-bold text-navy-900 dark:text-white text-base flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-saffron-500" />
                  Real-Time Discovered Compounds ({molecules.length})
                </h3>
                <p className="text-xs text-navy-400 dark:text-zinc-500">
                  Chemical structure conformations extracted directly from paper text coordinates
                </p>
              </div>

              {/* Loader placeholder when no molecules are found yet */}
              {molecules.length === 0 && paper?.status === 'PROCESSING' && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Atom className="h-12 w-12 text-navy-200 dark:text-zinc-800 animate-spin mb-4" />
                  <p className="text-sm font-semibold text-navy-600 dark:text-zinc-400">
                    Scanning publication text segments...
                  </p>
                  <p className="text-xs text-navy-400 dark:text-zinc-500 mt-1 max-w-sm leading-relaxed">
                    Identified chemical compound structures and their 2D bonds will populate here instantly as they are saved in the database.
                  </p>
                </div>
              )}

              {molecules.length === 0 && paper?.status === 'COMPLETED' && (
                <div className="flex flex-col items-center justify-center py-16 text-center text-navy-400 dark:text-zinc-500">
                  <Atom className="h-12 w-12 mb-3 opacity-30" />
                  <p className="text-sm font-semibold">No molecular structures found in this paper.</p>
                </div>
              )}

              {/* Molecule Conformations Grid */}
              {molecules.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {molecules.map((m: any) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass rounded-2xl p-4 border border-navy-100/10 dark:border-zinc-800/30 flex flex-col items-center hover:shadow-lg transition-shadow relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="w-full flex items-center justify-between mb-3 z-10">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          m.status === 'NOVEL' 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {m.status}
                        </span>
                        <span className="text-[10px] font-semibold text-navy-400 dark:text-zinc-500">
                          Tanimoto Similarity: {(m.tanimotoSimilarity * 100).toFixed(1)}%
                        </span>
                      </div>

                      {/* Chemical Bonds Depiction */}
                      <div className="bg-white/90 dark:bg-zinc-950/80 border border-navy-50/50 dark:border-zinc-900 rounded-xl p-2 mb-3 w-full flex justify-center shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                        <MoleculeRenderer smiles={m.smiles} width={180} height={180} />
                      </div>

                      <p className="font-semibold text-sm text-navy-900 dark:text-white text-center truncate w-full" title={m.iupacName}>
                        {m.iupacName || 'Unnamed Compound'}
                      </p>
                      <p className="text-[10px] font-mono text-navy-400 dark:text-zinc-500 truncate w-full text-center mt-1 select-all" title={m.smiles}>
                        {m.smiles}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Navigation Proceed Footer */}
              {paper?.status === 'COMPLETED' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end pt-4 border-t border-navy-100/10 dark:border-zinc-800/30"
                >
                  <Button
                    onClick={() => navigate(`/papers/${paper.id}`)}
                    variant="primary"
                    size="lg"
                    className="flex items-center gap-2 group shadow-emerald-500/15"
                  >
                    Proceed to IP Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
