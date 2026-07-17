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
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRegister } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { institutionApi } from '@/api/institutions';
import type { Institution } from '@/types/models';
import { useDarkMode } from '@/hooks/useDarkMode';
import researchStudentImg from '@/assets/research_student.png';
import { CompoundSVG } from '@/components/ui/CompoundSVG';
import { ResearchPaperSVG } from '@/components/ui/ResearchPaperSVG';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institutionId, setInstitutionId] = useState('');
  const [role, setRole] = useState<'RESEARCHER' | 'TTO_OFFICER'>('RESEARCHER');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: register, isPending, error } = useRegister();
  const { isDark, toggle } = useDarkMode();

  const { data: institutions } = useQuery<Institution[]>({
    queryKey: ['institutions'],
    queryFn: institutionApi.list,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register({ name, email, password, institutionId: Number(institutionId), role });
  };

  return (
    <div className="min-h-screen grid grid-cols-12 bg-white dark:bg-black transition-colors duration-500 ease-in-out relative overflow-hidden font-sans">
      {/* Floating Theme & Back Buttons */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <motion.button
          onClick={toggle}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer backdrop-blur-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-purple-400" />
          )}
        </motion.button>

        <Link to="/">
          <motion.div
            className="flex h-10 px-4 items-center gap-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Home</span>
          </motion.div>
        </Link>
      </div>

      {/* Left side: Premium Vector Illustration (Lighter shade panel only in dark mode) */}
      <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-12 bg-white dark:bg-zinc-900/20 relative overflow-hidden transition-colors duration-500 ease-in-out">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2 z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 text-white shadow-md shadow-purple-500/20">
            <FlaskConical className="h-4.5 w-4.5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display">
            sanjeevani<span className="text-purple-500">.</span>
          </span>
        </div>

        {/* Center Illustration */}
        <div className="relative my-auto flex flex-col items-center justify-center">
          <div className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[80px] -z-10" />
          <img
            src={researchStudentImg}
            alt="Research Student Vector"
            className="w-full max-w-sm xl:max-w-md object-contain select-none translate-x-16 lg:translate-x-24"
          />

          {/* Compound Vector */}
          <div className="absolute top-12 left-4 lg:left-8 w-24 h-24 z-20">
            <CompoundSVG />
          </div>

          {/* Research Paper Vector */}
          <div className="absolute bottom-24 left-10 lg:left-20 w-20 h-28 z-20">
            <ResearchPaperSVG />
          </div>
          <div className="text-center mt-8 space-y-2 max-w-sm">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-200 font-display">
              Join the Scientific IP Network
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Empower your Technology Transfer Office or laboratory to scan and track chemical entity grace periods.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 z-10">
          Indian Academic Technology Transfer Platform &copy; {new Date().getFullYear()}
        </div>
      </div>

      {/* Right side: Register Form (Black bg only in dark mode) */}
      <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-6 md:p-12 bg-white dark:bg-black overflow-y-auto max-h-screen transition-colors duration-500 ease-in-out">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center lg:text-left space-y-2">
            {/* Small icon for mobile screens */}
            <div className="lg:hidden mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-purple-400 text-white mb-4 shadow-md shadow-purple-500/20">
              <FlaskConical className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display">
              Create your account
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Register your institution and access the grace scanner
            </p>
          </div>

          <GlassCard variant="strong" className="border border-zinc-200/50 dark:border-zinc-800/80 shadow-lg p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md transition-colors duration-500 ease-in-out">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-[11px] font-medium text-red-400"
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
                placeholder="Dr. Sarah Connor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                id="email"
                label="Institutional Email"
                type="email"
                placeholder="you@institution.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="w-full space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-750 dark:text-zinc-300">
                  Your Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('RESEARCHER')}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                      role === 'RESEARCHER'
                        ? 'bg-purple-600 border-purple-600 text-white shadow-sm shadow-purple-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                    }`}
                  >
                    Researcher
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('TTO_OFFICER')}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                      role === 'TTO_OFFICER'
                        ? 'bg-purple-600 border-purple-600 text-white shadow-sm shadow-purple-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                    }`}
                  >
                    TTO Officer
                  </button>
                </div>
              </div>

              <div className="w-full space-y-1.5">
                <label
                  htmlFor="institution"
                  className="block text-xs font-semibold text-zinc-750 dark:text-zinc-300"
                >
                  Institution
                </label>
                <select
                  id="institution"
                  value={institutionId}
                  onChange={(e) => setInstitutionId(e.target.value)}
                  required
                  className="w-full rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer"
                >
                  <option value="" disabled className="text-zinc-400 bg-white dark:bg-zinc-900">
                    Select your institution
                  </option>
                  {institutions?.map((inst) => (
                    <option key={inst.id} value={inst.id} className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900">
                      {inst.name} ({inst.type})
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isPending}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/10 py-2.5 text-xs rounded-xl font-semibold cursor-pointer mt-2"
              >
                Create scanner account
              </Button>
            </form>
          </GlassCard>

          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
