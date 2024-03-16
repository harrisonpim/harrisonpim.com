export const formatYear = (date: string): string | null => {
  if (date) {
    return new Date(date).toLocaleDateString('en-GB', { year: 'numeric' })
  } else return null
}

export const formatMonth = (date: string | undefined): string => {
  if (!date) return 'Present'
  return new Date(date).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDuration = (startDate: Date, endDate: Date): string => {
  const differenceInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  const years = Math.floor(differenceInMonths / 12)
  const months = differenceInMonths % 12
  let duration = ''
  if (years) {
    duration += `${years} year${years > 1 ? 's' : ''}`
  }
  if (years && months) {
    duration += ', '
  }
  if (months) {
    duration += `${months} month${months > 1 ? 's' : ''}`
  }
  return duration.trim()
}

export const timeInOrganisation = (job): string => {
  // start date is the earliest role start date
  const startDates = job.roles.map((role) => new Date(role['start-date']))
  const startDate = new Date(Math.min(...startDates))

  // end date is the latest role end date, or today if there is no end date
  const endDates = job.roles.map((role) =>
    role['end-date'] ? new Date(role['end-date']) : new Date(),
  )
  const endDate = new Date(Math.max(...endDates))

  return formatDuration(startDate, endDate)
}
