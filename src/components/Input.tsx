import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { cn } from "../utils/tailwind"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <React.Fragment>
      <label {...props} className={cn("inline-block font-medium", className)}>
        {children}
      </label>
      {required && <span aria-hidden="true">*</span>}
    </React.Fragment>
  )
}

type ErrorProps = {
  error?: string
  className?: string
}

export function Error({ className, error }: ErrorProps) {
  if (!error) return null
  return <p className={cn("mb-2 text-sm text-red-400", className)}>{error}</p>
}

type InputProps = UseFormRegisterReturn &
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    error?: string
    required?: boolean
  }

export const Input = React.forwardRef(
  (
    { className, label, error, required, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <div className={className}>
      <Label htmlFor={props.name} required={required}>
        {label}
      </Label>
      <Error error={error} />
      <input
        id={props.name}
        className="mt-1 block w-full rounded border border-black bg-white px-1"
        {...props}
        ref={ref}
      />
    </div>
  ),
)

type SelectProps = UseFormRegisterReturn &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
    error?: string
  }

export const Select = React.forwardRef(
  (
    { className, label, required, error, ...props }: SelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>,
  ) => (
    <div className={className}>
      <Label htmlFor={props.name} required={required}>
        {label}
      </Label>
      <Error error={error} />
      <select
        id={props.name}
        className="mt-1 block w-full rounded border border-black bg-white px-1"
        {...props}
        ref={ref}
      />
    </div>
  ),
)

type RadioProps = Omit<InputProps, "type"> & {
  error?: string
  options: { label: string; value: string; disabled?: boolean }[]
}

export const RadioGroup = React.forwardRef(
  (
    { label, error, options, required, ...props }: RadioProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <div>
      <Label htmlFor={props.name} required={required} className="mb-1">
        {label}
      </Label>
      <Error error={error} />
      {options.map(({ label, value, disabled }) => (
        <RadioInput
          key={value}
          value={value}
          label={label}
          disabled={disabled}
          {...props}
          ref={ref}
        />
      ))}
    </div>
  ),
)

const RadioInput = React.forwardRef(
  (
    { label, ...props }: Omit<InputProps, "type">,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <div>
      <input id={String(props.value)} type="radio" {...props} ref={ref} />{" "}
      <label htmlFor={String(props.value)}>{label}</label>
    </div>
  ),
)

export const Checkbox = React.forwardRef(
  (
    {
      label,
      subLabel,
      ...props
    }: Omit<InputProps, "type"> & { subLabel?: string },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <div>
      <input id={String(props.value)} type="checkbox" {...props} ref={ref} />{" "}
      <label
        htmlFor={String(props.value)}
        className={cn(subLabel && "inline-flex items-center gap-1")}
      >
        {label}
        {subLabel && <span className="text-sm text-gray-400">{subLabel}</span>}
      </label>
    </div>
  ),
)
