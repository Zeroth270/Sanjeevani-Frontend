import { useState, useCallback, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { usePollPaper } from '@/hooks/usePollPaper';
import { papersApi } from '@/api/papers';
import type { Paper } from '@/types/models';

export default function PaperUploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [mode, setMode] = useState<'file' | 'paste'>('file');
  const [uploading, setUploading] = useState(false);
  const [paperId, setPaperId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: paper } = usePollPaper(paperId ?? undefined, !!paperId);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && (dropped.type === 'application/pdf' || dropped.name.endsWith('.pdf') || dropped.name.endsWith('.docx'))) {
      setFile(dropped);
      setError(null);
    } else {
      setError('Please upload a PDF or DOCX file');
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
      if (mode === 'file' && file) {
        formData.append('file', file);
      } else {
        formData.append('text', pasteText);
      }

      const result: Paper = await papersApi.upload(formData);
      setPaperId(result.id);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (paper && (paper.status === 'COMPLETED' || paper.status === 'FAILED')) {
    navigate(`/papers/${paper.id}`, { replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">
          Upload Paper
        </h1>
        <p className="mt-1 text-sm text-navy-500">
          Upload a research paper or paste raw text for molecule scanning
        </p>
      </motion.div>

      <GlassCard variant="strong">
        <div className="mb-6 flex gap-2 rounded-xl bg-navy-50 p-1">
          <button
            onClick={() => setMode('file')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === 'file'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-navy-500 hover:text-navy-700'
            }`}
          >
            <Upload className="mr-1.5 inline h-4 w-4" />
            File Upload
          </button>
          <button
            onClick={() => setMode('paste')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === 'paste'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-navy-500 hover:text-navy-700'
            }`}
          >
            <FileText className="mr-1.5 inline h-4 w-4" />
            Paste Text
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {mode === 'file' ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy-200 p-10 text-center transition-colors hover:border-saffron-300 hover:bg-saffron-50/30"
            >
              {!file ? (
                <>
                  <Upload className="mb-3 h-10 w-10 text-navy-300" />
                  <p className="text-sm font-medium text-navy-600">
                    Drag & drop your file here
                  </p>
                  <p className="mt-1 text-xs text-navy-400">
                    PDF or DOCX up to 50MB
                  </p>
                  <label className="mt-4">
                    <span className="inline-flex cursor-pointer rounded-xl bg-saffron-500 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-saffron-600">
                      Browse files
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.docx,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) { setFile(f); setError(null); }
                      }}
                    />
                  </label>
                </>
              ) : (
                <div className="flex w-full items-center gap-3 rounded-xl bg-navy-50 p-4">
                  <FileText className="h-8 w-8 shrink-0 text-saffron-500" />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-medium text-navy-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-navy-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="shrink-0 rounded-lg p-1 text-navy-400 hover:bg-navy-100 hover:text-navy-600"
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
              className="glass w-full resize-none rounded-2xl p-4 text-sm leading-relaxed focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-100"
            />
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={uploading}
            className="w-full"
          >
            {uploading ? 'Scanning molecules...' : 'Start Molecule Scan'}
          </Button>
        </form>
      </GlassCard>

      {paperId && paper?.status === 'PROCESSING' && (
        <GlassCard variant="saffron" className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-saffron-500 border-t-transparent" />
          <div>
            <p className="text-sm font-semibold text-saffron-700">
              Processing your paper
            </p>
            <p className="text-xs text-saffron-600">
              Extracting molecular structures...
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
