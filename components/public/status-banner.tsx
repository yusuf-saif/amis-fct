import { cx } from "@/lib/cx";

export function StatusBanner({
  tone,
  title,
  description,
}: {
  tone: "success" | "error" | "info";
  title: string;
  description?: string;
}) {
  const tones = {
    success: "border-semantic-successBorder bg-semantic-successBg text-status-success",
    error: "border-semantic-errorBorder bg-semantic-errorBg text-status-error",
    info: "border-semantic-infoBorder bg-semantic-infoBg text-status-info",
  };

  return (
    <div className={cx("rounded-xl border px-4 py-3 text-sm", tones[tone])} role="status">
      <p className="font-semibold">{title}</p>
      {description ? <p className="mt-1 leading-relaxed">{description}</p> : null}
    </div>
  );
}
