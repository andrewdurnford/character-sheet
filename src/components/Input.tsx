import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { cn } from "../utils/tailwind"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <React.Fragment>
      <label {...props} className={cn("inline-block font-bold", className)}>
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

type TextAreaProps = UseFormRegisterReturn &
  React.InputHTMLAttributes<HTMLTextAreaElement> & {
    label: string
    error?: string
    required?: boolean
  }

export const TextArea = React.forwardRef(
  (
    { className, label, error, required, ...props }: TextAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>,
  ) => (
    <div className={className}>
      <Label htmlFor={props.name} required={required}>
        {label}
      </Label>
      <Error error={error} />
      <textarea
        id={props.name}
        className="mt-1 block w-full rounded border border-black bg-white px-1"
        rows={6}
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
    <fieldset>
      <legend className="mb-1 font-bold">
        {label}
        {required && <span aria-hidden="true">*</span>}
      </legend>
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
      <Error error={error} />
    </fieldset>
  ),
)

type ChecklistProps = Omit<InputProps, "type"> & {
  select?: number
  selectCount?: number
  error?: string
  options: {
    label: string
    subLabel?: string
    value: string
    disabled?: boolean
  }[]
}

export const Checklist = React.forwardRef(
  (
    {
      label,
      select,
      selectCount,
      error,
      options,
      required,
      ...props
    }: ChecklistProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <fieldset>
      <legend className="mb-1 font-bold">
        {label}
        {required && <span aria-hidden="true">*</span>}
      </legend>

      {options.map(({ label, subLabel, value, disabled }) => (
        <Checkbox
          key={value}
          value={value}
          label={label}
          subLabel={subLabel}
          disabled={disabled}
          {...props}
          ref={ref}
        />
      ))}

      {select && (
        <p className="mt-2 flex items-center gap-1 text-sm">
          (Select {select}){select === selectCount && " ✅"}
        </p>
      )}
      <Error error={error} className="mt-1" />
    </fieldset>
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
