export const formatYear = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', { year: 'numeric' })
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
