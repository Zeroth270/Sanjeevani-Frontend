import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FlaskConical, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sun, 
  Moon, 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  Building 
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRegister } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { institutionApi } from '@/api/institutions';
import type { Institution } from '@/types/models';
import { useDarkMode } from '@/hooks/useDarkMode';
import { MovingVectors } from '@/components/ui/MovingVectors';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institutionId, setInstitutionId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { mutate: register, isPending, error } = useRegister();
  const { isDark, toggle } = useDarkMode();

  const { data: institutions } = useQuery<Institution[]>({
    queryKey: ['institutions'],
    queryFn: institutionApi.list,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register({ name, email, password, institutionId });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-pearl-50 dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Vectors */}
      <MovingVectors />

      {/* Floating Theme & Back Buttons */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <motion.button
          onClick={toggle}
          className="flex h-10 w-10 items-center justify-center rounded-xl glass border border-white/10 dark:border-zinc-800 text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-saffron-400" />
          ) : (
            <Moon className="h-5 w-5 text-navy-700" />
          )}
        </motion.button>

        <Link to="/">
          <motion.div
            className="flex h-10 px-4 items-center gap-2 rounded-xl glass border border-white/10 dark:border-zinc-800 text-xs font-semibold text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Home</span>
          </motion.div>
        </Link>
      </div>

      {/* Left side: Premium Scientific Graphics / App Preview */}
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-gradient-to-br from-navy-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 text-white border-r border-white/5 relative"
      >
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/20">
            <FlaskConical className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display">Sanjeevani</span>
        </div>

        {/* Dynamic Display widget */}
        <div className="space-y-8 z-10 my-auto">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight font-display">
              Join India&apos;s chemical IP network.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Empower your Technology Transfer Office (TTO) or CSIR laboratory to track novel chemical entities and disclosures under Section 31.
            </p>
          </div>

          {/* Stat panel */}
          <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-sm">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Building className="h-4 w-4" />
                CSIR & University Network
              </span>
              <span className="bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                Connected
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono">140+</span>
              <span className="text-xs text-zinc-400">Institutions Registered</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-zinc-400 border-t border-white/5 pt-3">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>Real-time molecular scanning active</span>
            </div>
          </div>

          {/* Quick list features */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Deep parsing of PDF, DOCX and LaTeX data</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>SMILES formula structure checks</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Automated Grace Period reminders</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-zinc-500 z-10">
          Indian Academic Technology Transfer Platform &copy; {new Date().getFullYear()}
        </div>
      </motion.div>

      {/* Right side: Register Form */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-12 lg:col-span-7 flex items-center justify-center p-6 md:p-12 overflow-y-auto max-h-screen py-16"
      >
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left space-y-2">
            {/* Small icon for mobile screens */}
            <div className="lg:hidden mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mb-4">
              <FlaskConical className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 dark:text-white font-display">
              Create your account
            </h1>
            <p className="text-sm text-navy-500 dark:text-zinc-400">
              Register as a technology transfer officer or researcher
            </p>
          </div>

          <GlassCard variant="strong" className="border border-white/20 dark:border-zinc-800 shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs font-semibold text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {(error as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ?? 'Registration failed'}
                </div>
              )}

              <Input
                id="name"
                label="Full Name"
                type="text"
                placeholder="Dr. A. Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />

              <Input
                id="email"
                label="Institutional Email"
                type="email"
                placeholder="you@institution.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />

              <div className="relative">
                <Input
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-9.5 text-navy-400 dark:text-zinc-500 hover:text-navy-600 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              <div className="w-full">
                <label
                  htmlFor="institution"
                  className="mb-1.5 block text-sm font-medium text-navy-700 dark:text-zinc-300"
                >
                  Institution
                </label>
                <select
                  id="institution"
                  value={institutionId}
                  onChange={(e) => setInstitutionId(e.target.value)}
                  required
                  className="glass w-full rounded-xl px-4 py-2.5 text-sm text-navy-900 dark:text-white bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                >
                  <option value="" disabled className="text-navy-950 dark:text-white dark:bg-zinc-900">
                    Select your institution
                  </option>
                  {institutions?.map((inst) => (
                    <option key={inst.id} value={inst.id} className="text-navy-950 dark:text-white dark:bg-zinc-900">
                      {inst.name} — {inst.city}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-lg shadow-emerald-500/20 mt-2"
              >
                Create scanner account
              </Button>
            </form>
          </GlassCard>

          <p className="text-center text-sm text-navy-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Log in instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
