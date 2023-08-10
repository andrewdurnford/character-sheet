import { cn } from "../utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded border border-gray-600 bg-gray-100 px-1 text-gray-600 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function LinkButton({
  children,
  className,
  ...props
}: Omit<ButtonProps, "type">) {
  return (
    <button
      type="button"
      className={cn("block hover:underline", className)}
      {...props}
    >
      {children}
    </button>
  )
}
