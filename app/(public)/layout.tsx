import { Footer } from "@/components/public/footer";
import { PublicHeader } from "@/components/public/public-header";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="public-shell flex min-h-screen flex-col">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <PublicHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
