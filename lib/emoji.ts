export function faviconEmoji(emoji: string = '👋'): {
  icon: string
  apple: string
} {
  const svg = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`
  return {
    icon: svg,
    apple: svg,
  }
}
