export const metadata = {
  title: "Cookie Consent | AMIS FCT",
  description: "Understand how AMIS FCT uses cookie consent preferences and essential site storage.",
};

export default function CookieConsentPage() {
  return (
    <main id="main-content" className="public-section">
      <div className="public-container public-reading-column space-y-6">
        <h1 className="text-h1 font-bold text-ink-primary">Cookie Consent</h1>
        <div className="public-prose">
          <p>AMIS FCT uses essential browser storage for basic website behavior and optional consent tracking for non-essential analytics choices.</p>
          <p>Your consent preference is stored locally in your browser and can be cleared at any time by resetting site data.</p>
        </div>
      </div>
    </main>
  );
}
