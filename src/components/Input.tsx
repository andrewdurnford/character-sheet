import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props} className="mb-1 inline-block font-medium">
      {children}
    </label>
  )
}

type InputProps = UseFormRegisterReturn &
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
  }

export const Input = React.forwardRef(
  (
    { className, label, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <div className={className}>
      <Label htmlFor={props.name}>{label}</Label>
      <input
        id={props.name}
        className="block w-full rounded border border-black bg-white px-1"
        {...props}
        ref={ref}
      />
    </div>
  ),
)

type SelectProps = UseFormRegisterReturn &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
  }

export const Select = React.forwardRef(
  (
    { className, label, ...props }: SelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>,
  ) => (
    <div className={className}>
      <label htmlFor={props.name}>{label}</label>
      <select
        id={props.name}
        className="block w-full rounded border border-black bg-white px-1"
        {...props}
        ref={ref}
      />
    </div>
  ),
)

type RadioProps = Omit<InputProps, "type"> & {
  options: { label: string; value: string; disabled?: boolean }[]
}

export const RadioGroup = React.forwardRef(
  (
    { label, options, ...props }: RadioProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
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
