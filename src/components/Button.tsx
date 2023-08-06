type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded border border-black bg-gray-200 px-1 ${className}`}
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
      className={`block hover:underline ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
