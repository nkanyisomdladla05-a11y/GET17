import type { ComponentProps } from "react";

interface FieldProps extends ComponentProps<"input"> {
  label: string;
  name: string;
  error?: string;
}

export function Field({ label, name, error, className = "", ...rest }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/80">{label}</span>
      <input
        name={name}
        id={name}
        className={`w-full rounded-2xl border bg-paper-2 px-4 py-3 text-sm outline-none transition placeholder:text-mist/60 focus:border-brand/60 ${
          error ? "border-bear/60" : "border-line"
        } ${className}`}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <span className="mt-1 block text-xs text-bear">{error}</span>}
    </label>
  );
}
