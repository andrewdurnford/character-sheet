// display >0 as +x
// display <0 as -x
export function mod(score: number) {
  return `${score > 0 ? "+" : ""}${score}`
}
