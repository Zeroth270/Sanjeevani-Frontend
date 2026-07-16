import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { User, Save } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/auth-store';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState(user?.name ?? '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: PATCH /api/auth/profile
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <User className="h-6 w-6 text-saffron-500" />
        <div>
          <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">
            Settings
          </h1>
          <p className="text-sm text-navy-500">
            Manage your profile and preferences
          </p>
        </div>
      </motion.div>

      <GlassCard variant="strong">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="name"
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            id="email"
            label="Email"
            type="email"
            value={user?.email ?? ''}
            disabled
          />

          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-navy-700">
              Institution
            </label>
            <input
              disabled
              value={user?.institution?.name ?? ''}
              className="glass w-full rounded-xl px-4 py-2.5 text-sm text-navy-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            {saved && (
              <span className="text-xs font-medium text-emerald-600">
                Saved successfully
              </span>
            )}
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
