import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { deriveSchoolLevel, generateUniqueSchoolSlug } from "@/lib/schools";
import { saveSchoolPhoto, validateSchoolPhotoFile } from "@/lib/uploads";
import { schoolRegistrationSchema } from "@/lib/validation/schools";

export async function POST(request: Request) {
  const formData = await request.formData();
  const honeypot = String(formData.get("website") ?? "").trim();

  if (honeypot) {
    return NextResponse.redirect(new URL("/register?status=success", request.url), 303);
  }

  const parsed = schoolRegistrationSchema.safeParse({
    schoolName: formData.get("schoolName"),
    areaCouncil: formData.get("areaCouncil"),
    arms: formData.getAll("arms"),
    principalName: formData.get("principalName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    yearEstablished: formData.get("yearEstablished"),
    description: formData.get("description"),
    ndprConsent: formData.get("ndprConsent") === "on",
    honeypot,
  });

  const photo = formData.get("photo");
  const file = photo instanceof File ? photo : null;
  const photoError = validateSchoolPhotoFile(file, true);

  if (!parsed.success || photoError || !file) {
    return NextResponse.redirect(new URL("/register?status=invalid", request.url), 303);
  }

  const photoUrl = await saveSchoolPhoto(file);
  const slug = await generateUniqueSchoolSlug(parsed.data.schoolName);

  await prisma.school.create({
    data: {
      name: parsed.data.schoolName,
      slug,
      areaCouncil: parsed.data.areaCouncil,
      level: deriveSchoolLevel(parsed.data.arms),
      arms: parsed.data.arms,
      principalName: parsed.data.principalName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      address: parsed.data.address,
      yearEstablished: parsed.data.yearEstablished,
      description: parsed.data.description,
      photoUrl,
      ndprConsent: true,
    },
  });

  return NextResponse.redirect(new URL("/register?status=success", request.url), 303);
}
