import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Clock } from 'lucide-react'
import type { Broker } from '../data/brokers'
import type { BrokerStatus } from '../types'

const DANGER_STYLES: Record<string, string> = {
  high:   'bg-red-50 text-red-600 border-red-100',
  medium: 'bg-amber-50 text-amber-600 border-amber-100',
  low:    'bg-green-50 text-green-600 border-green-100',
}

const DANGER_DOT: Record<string, string> = {
  high:   'bg-red-500',
  medium: 'bg-amber-500',
  low:    'bg-green-500',
}

const STATUS_STYLES: Record<BrokerStatus, string> = {
  not_started: 'bg-ink-100 text-ink-400',
  in_progress: 'bg-blue-50 text-blue-600',
  done:        'bg-green-50 text-green-700',
  due:         'bg-orange-50 text-orange-600',
}

const STATUS_LABELS: Record<BrokerStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  done:        'Opted out',
  due:         'Renewal due',
}

interface Props {
  broker: Broker
  status: BrokerStatus
}

export default function BrokerCard({ broker, status }: Props) {
  return (
    <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
      <Link
        to={`/broker/${broker.id}`}
        className="card p-5 flex items-center gap-4 hover:shadow-card-lg transition-shadow group"
      >
        {/* Danger dot */}
        <span className={`w-2 h-2 rounded-full shrink-0 ${DANGER_DOT[broker.dangerLevel]}`} />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-ink-900 group-hover:text-brand-600 transition-colors">
              {broker.name}
            </span>
            <span className={`label-chip border ${DANGER_STYLES[broker.dangerLevel]}`}>
              {broker.dangerLevel}
            </span>
          </div>
          <p className="text-xs text-ink-400 truncate">{broker.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {broker.dataCategories.slice(0, 3).map(cat => (
              <span key={cat} className="text-xs px-2 py-0.5 bg-cream-200 text-ink-500 rounded-full">
                {cat}
              </span>
            ))}
            {broker.dataCategories.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-cream-200 text-ink-400 rounded-full">
                +{broker.dataCategories.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className={`label-chip ${STATUS_STYLES[status]}`}>
            {STATUS_LABELS[status]}
          </span>
          <span className="flex items-center gap-1 text-xs text-ink-300">
            <Clock className="w-3 h-3" />
            {broker.processingTime}
          </span>
        </div>

        <ChevronRight className="w-4 h-4 text-ink-300 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all shrink-0" />
      </Link>
    </motion.div>
  )
}
