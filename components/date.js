export const formatYear = (dateString) => {
  if (dateString) {
    const options = { year: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return null
}

export const formatDate = (dateString) => {
  if (dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return null
}
