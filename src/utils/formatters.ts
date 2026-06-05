export function formatCurrency(amount: number | string | undefined) {
  const value = Number(amount) || 0
  return `${value.toLocaleString('en-US')} RWF`
}

export function formatDate(dateString: string | undefined) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTimestamp(firestoreTimestamp: any) {
  if (!firestoreTimestamp) return '—'
  const date = firestoreTimestamp.toDate ? firestoreTimestamp.toDate() : new Date(firestoreTimestamp)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
