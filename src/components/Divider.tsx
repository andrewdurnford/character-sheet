import { cn } from "../utils/tailwind"

type DividerProps = {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <hr className={cn("h-px w-full border-0 bg-gray-300", className)} />
}
