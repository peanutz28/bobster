import { Link } from 'react-router-dom'
import type { Broker } from '../data/brokers'
import type { BrokerStatus } from '../types'

const DANGER_STYLES: Record<string, string> = {
  high:   'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low:    'bg-green-100 text-green-700',
}

const STATUS_STYLES: Record<BrokerStatus, string> = {
  not_started: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-100 text-blue-700',
  done:        'bg-green-100 text-green-700',
  due:         'bg-orange-100 text-orange-700',
}

const STATUS_LABELS: Record<BrokerStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  done:        'Done ✓',
  due:         'Due for renewal',
}

interface Props {
  broker: Broker
  status: BrokerStatus
}

export default function BrokerCard({ broker, status }: Props) {
  return (
    <Link
      to={`/broker/${broker.id}`}
      className="card p-5 flex items-start gap-4 hover:shadow-md transition-shadow group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap mb-1.5">
          <span className="font-semibold text-gray-900 group-hover:text-lobster-600 transition-colors">
            {broker.name}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DANGER_STYLES[broker.dangerLevel]}`}>
            {broker.dangerLevel} risk
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">{broker.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {broker.dataCategories.slice(0, 4).map(cat => (
            <span key={cat} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
              {cat}
            </span>
          ))}
          {broker.dataCategories.length > 4 && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
              +{broker.dataCategories.length - 4} more
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[status]}`}>
          {STATUS_LABELS[status]}
        </span>
        <span className="text-xs text-gray-400">{broker.processingTime}</span>
      </div>
    </Link>
  )
}
