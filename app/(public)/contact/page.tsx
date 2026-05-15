import { Button } from "@/components/public/button";
import { FormField } from "@/components/public/form-field";
import { PageHero } from "@/components/public/page-hero";
import { StatusBanner } from "@/components/public/status-banner";

export const metadata = {
  title: "Contact | AMIS FCT",
  description: "Send an enquiry to AMIS FCT for school admissions, membership, media, or general communication.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const params = await searchParams;

  return (
    <main id="main-content">
      <PageHero breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Contact" }]} subtitle="Reach the AMIS FCT secretariat for general enquiries, school membership, partnerships, and media contact." title="Contact Us" />
      <section className="public-section pt-6">
        <div className="public-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="card-public space-y-4">
              <h2 className="text-2xl font-semibold text-ink-primary">Contact Information</h2>
              <p className="text-sm leading-relaxed text-ink-secondary">AMIS FCT Secretariat, Abuja, Federal Capital Territory, Nigeria</p>
              <p className="text-sm leading-relaxed text-ink-secondary">info@amisfct.org · +234 (0) 800 000 0000</p>
              <div className="space-y-2 text-sm text-ink-secondary">
                <p><span className="font-semibold text-ink-primary">General:</span> info@amisfct.org</p>
                <p><span className="font-semibold text-ink-primary">Media / Press:</span> media@amisfct.org</p>
                <p><span className="font-semibold text-ink-primary">School Membership:</span> membership@amisfct.org</p>
              </div>
            </div>
            <div aria-label="Map placeholder for AMIS FCT office" className="public-photo-panel h-72 w-full rounded-2xl" role="img" />
          </div>

          <div className="space-y-6">
            {params.status === "success" ? <StatusBanner description="Your enquiry has been received successfully." title="Message sent" tone="success" /> : null}
            {params.status === "invalid" ? <StatusBanner description="Please review the form fields, attachment type, and consent checkbox." title="Unable to send message" tone="error" /> : null}
            <form action="/api/contact" className="card-public space-y-4" encType="multipart/form-data" method="post">
              <FormField id="fullName" label="Full Name" name="fullName" required />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField id="email" label="Email" name="email" required type="email" />
                <FormField id="phone" label="Phone" name="phone" type="tel" />
              </div>
              <label className="block space-y-2"><span className="text-sm font-medium text-ink-primary">Subject *</span><select className="input-base" name="subject" required><option value="">Select subject</option><option>General Enquiry</option><option>School Admissions</option><option>School Membership</option><option>Partnership</option><option>Media Enquiry</option><option>Website Feedback</option></select></label>
              <FormField id="message" label="Message" name="message" required rows={6} type="textarea" />
              <label className="block space-y-2"><span className="text-sm font-medium text-ink-primary">Attachment (optional)</span><input accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png" className="input-base pt-3" name="attachment" type="file" /></label>
              <FormField id="ndprConsent" label="I agree that my submitted data is collected and stored according to the Privacy Policy." name="ndprConsent" required type="checkbox" />
              <Button type="submit">Send Enquiry</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
