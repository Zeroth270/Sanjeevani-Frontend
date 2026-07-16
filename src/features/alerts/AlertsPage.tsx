import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, CheckCheck, AlertTriangle, FlaskConical, Clock, Info } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { alertsApi } from '@/api/alerts';
import { formatDate } from '@/lib/utils';
import type { Alert } from '@/types/models';

const alertIcon = {
  DISCLOSURE_URGENT: Clock,
  NOVELTY_FOUND: FlaskConical,
  PATENT_DEADLINE: AlertTriangle,
  SYSTEM: Info,
};

const alertVariant: Record<string, 'danger' | 'success' | 'warning' | 'info'> = {
  DISCLOSURE_URGENT: 'danger',
  NOVELTY_FOUND: 'success',
  PATENT_DEADLINE: 'warning',
  SYSTEM: 'info',
};

function AlertRow({
  alert: item,
  onMarkRead,
}: {
  alert: Alert;
  onMarkRead: (id: string) => void;
}) {
  const Icon = alertIcon[item.type] ?? Bell;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
    >
      <GlassCard
        className={`flex items-start gap-4 ${
          !item.read ? 'border-saffron-200 bg-saffron-50/30' : ''
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            !item.read
              ? 'bg-saffron-100 text-saffron-600'
              : 'bg-navy-50 text-navy-400'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-navy-900">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-navy-500">{item.message}</p>
            </div>
            {!item.read && (
              <button
                onClick={() => onMarkRead(item.id)}
                className="shrink-0 rounded-lg p-1.5 text-navy-400 hover:bg-navy-100 hover:text-navy-600"
                aria-label="Mark as read"
              >
                <CheckCheck className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-navy-400">
            <Badge variant={alertVariant[item.type] ?? 'info'}>
              {item.type.replace(/_/g, ' ')}
            </Badge>
            <span>{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function AlertsPage() {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const queryClient = useQueryClient();

  const { data: alerts, isLoading } = useQuery<Alert[]>({
    queryKey: ['alerts', unreadOnly],
    queryFn: () => alertsApi.list(unreadOnly || undefined),
  });

  const { mutate: markRead } = useMutation({
    mutationFn: (id: string) => alertsApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const unreadCount = alerts?.filter((a) => !a.read).length ?? 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-saffron-500" />
          <div>
            <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">
              Alerts
            </h1>
            <p className="text-sm text-navy-500">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button
          variant={unreadOnly ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setUnreadOnly(!unreadOnly)}
        >
          {unreadOnly ? 'All alerts' : 'Unread only'}
        </Button>
      </motion.div>

      <div className="space-y-3">
        {isLoading && <SkeletonLoader variant="card" count={5} />}

        <AnimatePresence mode="popLayout">
          {alerts?.map((alert) => (
            <AlertRow key={alert.id} alert={alert} onMarkRead={markRead} />
          ))}
        </AnimatePresence>

        {alerts?.length === 0 && (
          <GlassCard className="py-12 text-center">
            <Bell className="mx-auto mb-3 h-10 w-10 text-navy-300" />
            <p className="text-sm font-medium text-navy-500">
              No alerts
            </p>
            <p className="mt-1 text-xs text-navy-400">
              You&apos;re all caught up.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
