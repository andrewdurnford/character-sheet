// display >=0 as +x
// display <0 as -x
export function mod(score: number) {
  return `${score >= 0 ? "+" : ""}${score}`
}

// return text -> Text
export function titleCase(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.substring(1)}`
}
