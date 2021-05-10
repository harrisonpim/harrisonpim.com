export const formatYear = (date: string): string => {
  if (date) {
    return new Date(date).toLocaleDateString('en-GB', { year: 'numeric' })
  } else return null
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
