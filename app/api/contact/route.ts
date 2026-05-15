import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/email";
import { saveContentFile, validateContentFile } from "@/lib/uploads";
import { contactEnquirySchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = contactEnquirySchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    ndprConsent: formData.get("ndprConsent") === "on",
  });

  const attachmentEntry = formData.get("attachment");
  const attachmentFile = attachmentEntry instanceof File ? attachmentEntry : null;
  const attachmentError = validateContentFile(attachmentFile, false, { maxSizeMb: 5 });

  if (!parsed.success || attachmentError) {
    return NextResponse.redirect(new URL("/contact?status=invalid", request.url), 303);
  }

  const upload = attachmentFile && attachmentFile.size > 0 ? await saveContentFile(attachmentFile, "enquiries") : null;
  await prisma.contactEnquiry.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject,
      message: parsed.data.message,
      attachmentUrl: upload?.url ?? null,
      ndprConsent: true,
    },
  });

  await sendTransactionalEmail({
    to: parsed.data.email,
    subject: `AMIS FCT enquiry received: ${parsed.data.subject}`,
    html: `<p>Assalamu alaikum,</p><p>Your message has been received by AMIS FCT.</p>`,
  });

  return NextResponse.redirect(new URL("/contact?status=success", request.url), 303);
}
