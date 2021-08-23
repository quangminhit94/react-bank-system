export const capitalizeString = (str?: string): string => {
  if(!str) return ''
  return `${str[0].toUpperCase()}${str.slice(1)}`
}
export const setScoreColor = (score?: number): string => {
  if(!score) return ''
  if(score >= 8) return 'green'
  if(score >= 4) return 'goldenrod'
  return 'red'
}