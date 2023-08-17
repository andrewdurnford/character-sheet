import { cn } from "../utils/tailwind"

type ListProps = {
  children: React.ReactNode
  className?: string
  style?: "disc" | "circle"
}

export function List({ className, children, style, ...props }: ListProps) {
  return (
    <li
      {...props}
      className={cn(style && "ml-[18px]", className)}
      style={{ listStyleType: style }}
    >
      {children}
    </li>
  )
}
