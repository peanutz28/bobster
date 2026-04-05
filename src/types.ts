export type BrokerStatus = 'not_started' | 'in_progress' | 'done' | 'due'

export interface UserProfile {
  firstName: string
  lastName: string
  state: string
  email?: string
}

export interface BrokerProgress {
  status: BrokerStatus
  completedAt?: number // timestamp
  dueAt?: number // timestamp when to re-do
}

export interface AppState {
  user: UserProfile | null
  riskSummary: string | null
  brokerProgress: Record<string, BrokerProgress>
  onboardingComplete: boolean
  notificationsEnabled: boolean
}
