export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function sendRenewalReminder(brokerName: string) {
  if (Notification.permission !== 'granted') return
  new Notification('🦞 Time to re-opt out!', {
    body: `Your ${brokerName} opt-out has expired. Head back to Bobster to redo it.`,
    icon: '/bobster.svg',
    tag: `renewal-${brokerName}`,
  })
}

export function scheduleRenewalCheck(brokerIds: string[], dueDates: Record<string, number>) {
  // Check due dates every time the user visits
  const now = Date.now()
  for (const id of brokerIds) {
    const dueAt = dueDates[id]
    if (dueAt && dueAt <= now) {
      sendRenewalReminder(id)
    }
  }
}
