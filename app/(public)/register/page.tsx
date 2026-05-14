import { SchoolArm } from "@prisma/client";

import { Button } from "@/components/public/button";
import { FormField } from "@/components/public/form-field";
import { PageHero } from "@/components/public/page-hero";
import { StatusBanner } from "@/components/public/status-banner";
import { AREA_COUNCILS, getSchoolArmLabel } from "@/lib/schools";

const feedbackMessages = {
  success: {
    title: "Application submitted",
    description: "Your school registration has been received and is now pending review. The secretariat will contact you using the details provided.",
  },
  invalid: {
    title: "We could not submit the application",
    description: "Please review the form fields and ensure all required details, photo rules, and NDPR consent requirements are met.",
  },
};

export default async function RegisterSchoolPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: keyof typeof feedbackMessages }>;
}) {
  const params = await searchParams;
  const feedback = params.status ? feedbackMessages[params.status] : null;

  return (
    <main id="main-content">
      <PageHero
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Register Your School" }]}
        subtitle="Submit your school details for review by the AMIS FCT secretariat. Applications are reviewed before publication in the public directory."
        title="Register Your School"
      />

      <section className="public-section pt-6">
        <div className="public-container">
          <div className="public-narrow-column space-y-8">
            {feedback ? <StatusBanner description={feedback.description} title={feedback.title} tone={params.status === "success" ? "success" : "error"} /> : null}

            <form action="/api/schools/register" className="space-y-6 rounded-2xl border border-surface-line bg-surface-page p-6 shadow-public1 md:p-8" encType="multipart/form-data" method="post">
              <FormField id="schoolName" label="School Name" name="schoolName" placeholder="Enter the official school name" required />

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="block text-sm font-medium text-ink-primary">Area Council *</span>
                  <select className="input-base" name="areaCouncil" required>
                    <option value="">Select an Area Council</option>
                    {AREA_COUNCILS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <FormField id="yearEstablished" label="Year Established" name="yearEstablished" placeholder="e.g. 2008" required type="text" />
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-ink-primary">Arms Operated *</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {([SchoolArm.NURSERY, SchoolArm.PRIMARY, SchoolArm.JSS, SchoolArm.SSS] as const).map((arm) => (
                    <label className="flex min-h-12 items-center gap-3 rounded-xl border border-surface-line bg-white px-4 py-3 text-sm text-ink-secondary" key={arm}>
                      <input className="h-4 w-4 rounded border-surface-line text-brand-green-600" name="arms" type="checkbox" value={arm} />
                      {getSchoolArmLabel(arm)}
                    </label>
                  ))}
                </div>
              </fieldset>

              <FormField id="principalName" label="Principal Name" name="principalName" placeholder="Name of principal or proprietor" required />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField id="email" label="Contact Email" name="email" placeholder="school@example.com" required type="email" />
                <FormField id="phone" label="Contact Phone" name="phone" placeholder="+234..." required type="tel" />
              </div>

              <FormField id="address" label="Physical Address" name="address" placeholder="School address" required />
              <FormField id="description" label="Short Description" name="description" placeholder="Tell AMIS FCT about the school in no more than 300 words." required rows={6} type="textarea" />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink-primary" htmlFor="photo">
                  School Photo *
                </label>
                <input accept="image/jpeg,image/png" className="input-base pt-3" id="photo" name="photo" required type="file" />
                <p className="text-xs text-ink-muted">Upload a JPG or PNG image up to 5MB.</p>
              </div>

              <div className="hidden">
                <label htmlFor="website">Website</label>
                <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
              </div>

              <FormField id="ndprConsent" label="I agree that my submitted data is collected and stored according to our Privacy Policy." name="ndprConsent" required type="checkbox" />

              <Button type="submit">Submit Application</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
