import { cn } from "../utils/tailwind"
import { Icon, IconName } from "./Icon"

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

type Size = keyof typeof sizes

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size
  icon?: IconName
}

export function Button({
  children,
  className,
  icon,
  type = "button",
  size = "base",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-block rounded border border-gray-600 bg-gray-100 px-1 text-gray-600 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300",
        sizes[size],
        className,
      )}
      type={type}
      {...props}
    >
      {icon && <Icon name={icon} />}
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
      className={cn("inline-block hover:underline", className)}
      {...props}
    >
      {children}
    </button>
  )
}
