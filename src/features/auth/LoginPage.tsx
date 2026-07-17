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
import { useLogin } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import { authApi } from '@/api/auth';
import researchStudentImg from '@/assets/research_student.png';
import { CompoundSVG } from '@/components/ui/CompoundSVG';
import { ResearchPaperSVG } from '@/components/ui/ResearchPaperSVG';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isBypassing, setIsBypassing] = useState(false);
  const { mutate: login, isPending, error } = useLogin();
  const { isDark, toggle } = useDarkMode();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleBypass = async () => {
    setIsBypassing(true);
    try {
      // Register dev user (ignoring if they are already registered)
      await authApi.register({
        name: 'Dev User',
        email: 'luffy@gmail.com',
        password: 'bankai',
        institutionId: 1, // IIT Bombay (ID 1 seeded in DB)
        role: 'RESEARCHER',
      });
    } catch (err) {
      // User is likely already registered
    }

    try {
      login({ email: 'dev@anvesha.com', password: 'password123' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsBypassing(false);
    }
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
            <Moon className="h-5 w-5 text-purple-600" />
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
              Empowering Academic Research
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Ingest molecular reports, scan SMILES formulations, and monitor Section 31 grace periods in real-time.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 z-10">
          Indian Academic Technology Transfer Platform &copy; {new Date().getFullYear()}
        </div>
      </div>

      {/* Right side: Login Form (Black bg only in dark mode) */}
      <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-6 md:p-12 bg-white dark:bg-black transition-colors duration-500 ease-in-out">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left space-y-2">
            {/* Small icon for mobile screens */}
            <div className="lg:hidden mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-purple-400 text-white mb-4 shadow-md shadow-purple-500/20">
              <FlaskConical className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display">
              Welcome back
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Log in to access your Sanjeevani scanner dashboard
            </p>
          </div>

          <GlassCard variant="strong" className="border border-zinc-200/50 dark:border-zinc-800/80 shadow-lg p-8 rounded-2xl bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md transition-colors duration-500 ease-in-out">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div
                  className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-[11px] font-medium text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {(error as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ?? 'Invalid credentials'}
                </div>
              )}

              <Input
                id="email"
                label="Institutional Email"
                type="email"
                required
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Password
                  </label>
                </div>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isPending}
                className="w-full py-2.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/10 cursor-pointer"
              >
                Sign In
              </Button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                <span className="flex-shrink mx-3 text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-semibold tracking-wider">Or</span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="lg"
                loading={isBypassing}
                onClick={handleBypass}
                className="w-full border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-white py-2.5 text-xs rounded-xl font-medium cursor-pointer"
              >
                Developer Bypass Login
              </Button>
            </form>
          </GlassCard>

          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              Register your institution
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
