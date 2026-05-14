import { cx } from "@/lib/cx";

type FormFieldProps = {
  id: string;
  name?: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "checkbox";
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  rows?: number;
  tone?: "default" | "inverse";
};

export function FormField({ id, name, label, type = "text", placeholder, required, helperText, error, className, rows = 4, tone = "default" }: FormFieldProps) {
  const describedBy = [helperText ? `${id}-helper` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const fieldClassName = cx("input-base", error && "border-semantic-errorBorder shadow-focus-error", type === "textarea" && "min-h-[120px]", className);
  const labelClassName = tone === "inverse" ? "text-white" : "text-ink-primary";
  const helperClassName = tone === "inverse" ? "text-emerald-50/75" : "text-ink-muted";
  const checkboxCopyClassName = tone === "inverse" ? "text-emerald-50/90" : "text-ink-secondary";

  if (type === "checkbox") {
    return (
      <div className="space-y-2">
        <label className={`flex items-start gap-3 text-sm leading-relaxed ${checkboxCopyClassName}`} htmlFor={id}>
          <input aria-describedby={describedBy} className="mt-1 h-5 w-5 rounded border-surface-line text-brand-green-600" id={id} name={name} required={required} type="checkbox" />
          <span>
            {label}
            {required ? <span aria-label="required"> *</span> : null}
          </span>
        </label>
        {helperText ? <p className={`text-xs ${helperClassName}`} id={`${id}-helper`}>{helperText}</p> : null}
        {error ? <p className="text-xs text-status-error" id={`${id}-error`} role="alert">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${labelClassName}`} htmlFor={id}>
        {label}
        {required ? <span aria-label="required"> *</span> : null}
      </label>
      {type === "textarea" ? (
        <textarea aria-describedby={describedBy} className={fieldClassName} id={id} name={name} placeholder={placeholder} required={required} rows={rows} />
      ) : (
        <input aria-describedby={describedBy} className={fieldClassName} id={id} name={name} placeholder={placeholder} required={required} type={type} />
      )}
      {helperText ? <p className={`text-xs ${helperClassName}`} id={`${id}-helper`}>{helperText}</p> : null}
      {error ? <p className="text-xs text-status-error" id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  );
}
