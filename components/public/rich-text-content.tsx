export function RichTextContent({ content }: { content: string }) {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5 text-base leading-relaxed text-ink-secondary">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
        const isList = lines.every((line) => /^[-*]\s+|^\d+\.\s+/.test(line));

        if (isList) {
          return (
            <ul className="list-disc space-y-2 pl-5" key={index}>
              {lines.map((line) => (
                <li key={line}>{line.replace(/^[-*]\s+|^\d+\.\s+/, "")}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}
