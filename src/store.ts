import { useState, useEffect, useCallback } from 'react'
import type { AppState, BrokerProgress, BrokerStatus, UserProfile } from './types'
import { brokers } from './data/brokers'

const STORAGE_KEY = 'bobster_state'

const defaultState: AppState = {
  user: null,
  riskSummary: null,
  brokerProgress: {},
  onboardingComplete: false,
  notificationsEnabled: false,
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage full or unavailable
  }
}

// Compute re-opt-out frequency in ms
function reOptOutMs(freq: string): number {
  switch (freq) {
    case '3 months': return 90 * 24 * 60 * 60 * 1000
    case '6 months': return 180 * 24 * 60 * 60 * 1000
    case '1 year':   return 365 * 24 * 60 * 60 * 1000
    default:         return 180 * 24 * 60 * 60 * 1000
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  // Check for expired opt-outs and mark them as due
  useEffect(() => {
    const now = Date.now()
    let changed = false
    const updated = { ...state.brokerProgress }
    for (const broker of brokers) {
      const progress = updated[broker.id]
      if (progress?.status === 'done' && progress.dueAt && progress.dueAt <= now) {
        updated[broker.id] = { ...progress, status: 'due' }
        changed = true
      }
    }
    if (changed) {
      setState(s => ({ ...s, brokerProgress: updated }))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setUser = useCallback((user: UserProfile) => {
    setState(s => ({ ...s, user }))
  }, [])

  const setRiskSummary = useCallback((riskSummary: string) => {
    setState(s => ({ ...s, riskSummary }))
  }, [])

  const completeOnboarding = useCallback(() => {
    setState(s => ({ ...s, onboardingComplete: true }))
  }, [])

  const updateBrokerStatus = useCallback((brokerId: string, status: BrokerStatus) => {
    setState(s => {
      const broker = brokers.find(b => b.id === brokerId)
      const now = Date.now()
      let progress: BrokerProgress = { status }
      if (status === 'done' && broker) {
        progress = {
          status,
          completedAt: now,
          dueAt: now + reOptOutMs(broker.reOptOutFrequency),
        }
      }
      return {
        ...s,
        brokerProgress: {
          ...s.brokerProgress,
          [brokerId]: progress,
        },
      }
    })
  }, [])

  const enableNotifications = useCallback(() => {
    setState(s => ({ ...s, notificationsEnabled: true }))
  }, [])

  const resetAll = useCallback(() => {
    setState(defaultState)
  }, [])

  const getBrokerStatus = useCallback((brokerId: string): BrokerStatus => {
    return state.brokerProgress[brokerId]?.status ?? 'not_started'
  }, [state.brokerProgress])

  const completedCount = Object.values(state.brokerProgress).filter(
    p => p.status === 'done'
  ).length

  const dueCount = Object.values(state.brokerProgress).filter(
    p => p.status === 'due'
  ).length

  return {
    state,
    setUser,
    setRiskSummary,
    completeOnboarding,
    updateBrokerStatus,
    enableNotifications,
    resetAll,
    getBrokerStatus,
    completedCount,
    dueCount,
    totalCount: brokers.length,
  }
}
