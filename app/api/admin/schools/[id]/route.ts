import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { AdminRole, SchoolStatus } from "@prisma/client";

import { writeAuditLog } from "@/lib/audit-log";
import { getCurrentAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/email";
import { deriveSchoolLevel, generateUniqueSchoolSlug } from "@/lib/schools";
import { saveSchoolPhoto, validateSchoolPhotoFile } from "@/lib/uploads";
import { adminMessageSchema, adminRejectSchema, adminSchoolUpdateSchema } from "@/lib/validation/schools";

function detailUrl(request: Request, id: string, params: Record<string, string>) {
  const url = new URL(`/admin/schools/${id}`, request.url);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url;
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const adminUser = await getCurrentAdminUser();

  if (!adminUser || adminUser.role !== AdminRole.SUPER_ADMIN) {
    return NextResponse.redirect(new URL("/admin/login?error=session_expired", request.url), 303);
  }

  const { id } = await context.params;
  const school = await prisma.school.findUnique({ where: { id } });

  if (!school) {
    return NextResponse.redirect(new URL("/admin/schools?feedback=missing-school", request.url), 303);
  }

  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "approve") {
    const slug = await generateUniqueSchoolSlug(school.name, school.id);
    const updated = await prisma.school.update({
      where: { id: school.id },
      data: {
        status: SchoolStatus.APPROVED,
        slug,
        approvedAt: new Date(),
        removedAt: null,
        rejectionReason: null,
        moreInfoRequestMessage: null,
      },
    });

    await sendTransactionalEmail({
      to: updated.email,
      subject: "Your AMIS FCT school application has been approved",
      html: `<p>Assalamu alaikum,</p><p>Your school application for <strong>${updated.name}</strong> has been approved and is now visible in the AMIS FCT directory.</p>`,
    });

    await writeAuditLog({
      actorAdminUserId: adminUser.id,
      action: "SCHOOL_APPROVE",
      entityType: "School",
      entityId: updated.id,
      metadata: { slug },
    });

    revalidatePath("/schools");
    revalidatePath(`/schools/${updated.slug}`);
    revalidatePath("/admin/schools");
    revalidatePath(`/admin/schools/${updated.id}`);

    return NextResponse.redirect(detailUrl(request, updated.id, { status: "approved" }), 303);
  }

  if (intent === "request_more_info") {
    const parsed = adminMessageSchema.safeParse({ message: formData.get("message") });

    if (!parsed.success) {
      return NextResponse.redirect(detailUrl(request, school.id, { error: "invalid-more-info-message" }), 303);
    }

    const updated = await prisma.school.update({
      where: { id: school.id },
      data: {
        status: SchoolStatus.MORE_INFO_REQUESTED,
        moreInfoRequestMessage: parsed.data.message,
        rejectionReason: null,
      },
    });

    await sendTransactionalEmail({
      to: updated.email,
      subject: "More information requested for your AMIS FCT application",
      html: `<p>Assalamu alaikum,</p><p>The AMIS FCT secretariat needs additional information regarding <strong>${updated.name}</strong>.</p><p>${parsed.data.message}</p>`,
    });

    await writeAuditLog({
      actorAdminUserId: adminUser.id,
      action: "SCHOOL_REQUEST_MORE_INFO",
      entityType: "School",
      entityId: updated.id,
      metadata: { message: parsed.data.message },
    });

    revalidatePath("/admin/schools");
    revalidatePath(`/admin/schools/${updated.id}`);

    return NextResponse.redirect(detailUrl(request, updated.id, { status: "more-info-requested" }), 303);
  }

  if (intent === "reject") {
    const parsed = adminRejectSchema.safeParse({ rejectionReason: formData.get("rejectionReason") });

    if (!parsed.success) {
      return NextResponse.redirect(detailUrl(request, school.id, { error: "invalid-rejection-reason" }), 303);
    }

    const updated = await prisma.school.update({
      where: { id: school.id },
      data: {
        status: SchoolStatus.REJECTED,
        rejectionReason: parsed.data.rejectionReason,
        moreInfoRequestMessage: null,
      },
    });

    await sendTransactionalEmail({
      to: updated.email,
      subject: "Your AMIS FCT school application was not approved",
      html: `<p>Assalamu alaikum,</p><p>Your application for <strong>${updated.name}</strong> was not approved at this time.</p><p>Reason: ${parsed.data.rejectionReason}</p>`,
    });

    await writeAuditLog({
      actorAdminUserId: adminUser.id,
      action: "SCHOOL_REJECT",
      entityType: "School",
      entityId: updated.id,
      metadata: { rejectionReason: parsed.data.rejectionReason },
    });

    revalidatePath("/admin/schools");
    revalidatePath(`/admin/schools/${updated.id}`);

    return NextResponse.redirect(detailUrl(request, updated.id, { status: "rejected" }), 303);
  }

  if (intent === "remove") {
    const updated = await prisma.school.update({
      where: { id: school.id },
      data: {
        status: SchoolStatus.REMOVED,
        removedAt: new Date(),
      },
    });

    await writeAuditLog({
      actorAdminUserId: adminUser.id,
      action: "SCHOOL_REMOVE",
      entityType: "School",
      entityId: updated.id,
    });

    revalidatePath("/schools");
    revalidatePath(`/schools/${updated.slug}`);
    revalidatePath("/admin/schools");
    revalidatePath(`/admin/schools/${updated.id}`);

    return NextResponse.redirect(detailUrl(request, updated.id, { status: "removed" }), 303);
  }

  if (intent === "update") {
    if (school.status !== SchoolStatus.APPROVED) {
      return NextResponse.redirect(detailUrl(request, school.id, { error: "only-approved-schools-can-be-edited" }), 303);
    }

    const parsed = adminSchoolUpdateSchema.safeParse({
      schoolName: formData.get("schoolName"),
      areaCouncil: formData.get("areaCouncil"),
      arms: formData.getAll("arms"),
      principalName: formData.get("principalName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      yearEstablished: formData.get("yearEstablished"),
      description: formData.get("description"),
      arabicName: formData.get("arabicName"),
      googleMapUrl: formData.get("googleMapUrl"),
    });

    const photoEntry = formData.get("photo");
    const photo = photoEntry instanceof File ? photoEntry : null;
    const photoError = validateSchoolPhotoFile(photo, false);

    if (!parsed.success || photoError) {
      return NextResponse.redirect(detailUrl(request, school.id, { error: "invalid-school-update" }), 303);
    }

    const slug = await generateUniqueSchoolSlug(parsed.data.schoolName, school.id);
    const nextPhotoUrl = photo && photo.size > 0 ? await saveSchoolPhoto(photo) : school.photoUrl;
    const updated = await prisma.school.update({
      where: { id: school.id },
      data: {
        name: parsed.data.schoolName,
        slug,
        areaCouncil: parsed.data.areaCouncil,
        arms: parsed.data.arms,
        level: deriveSchoolLevel(parsed.data.arms),
        principalName: parsed.data.principalName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address,
        yearEstablished: parsed.data.yearEstablished,
        description: parsed.data.description,
        arabicName: parsed.data.arabicName || null,
        googleMapUrl: parsed.data.googleMapUrl || null,
        photoUrl: nextPhotoUrl,
      },
    });

    await writeAuditLog({
      actorAdminUserId: adminUser.id,
      action: "SCHOOL_UPDATE",
      entityType: "School",
      entityId: updated.id,
      metadata: { slug },
    });

    revalidatePath("/schools");
    revalidatePath(`/schools/${updated.slug}`);
    revalidatePath("/admin/schools");
    revalidatePath(`/admin/schools/${updated.id}`);

    return NextResponse.redirect(detailUrl(request, updated.id, { status: "updated" }), 303);
  }

  return NextResponse.redirect(detailUrl(request, school.id, { error: "unknown-action" }), 303);
}
