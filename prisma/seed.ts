import {
  AdminRole,
  DuesStatus,
  DuesTier,
  EventType,
  NewsCategory,
  NotificationStatus,
  PublishingStatus,
  ResourceCategory,
  SchoolArm,
  SchoolLevel,
  SchoolStatus,
} from "@prisma/client";

import { hashPassword } from "../lib/security";
import { prisma } from "../lib/db";

async function main() {
  const superAdminEmail = process.env.ADMIN_SEED_EMAIL ?? "superadmin@amisfct.org";
  const superAdminPassword = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await hashPassword(superAdminPassword);

  const admin = await prisma.adminUser.upsert({
    where: { email: superAdminEmail },
    update: {
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
      name: "AMIS FCT Super Admin",
    },
    create: {
      email: superAdminEmail,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
      name: "AMIS FCT Super Admin",
    },
  });

  const school = await prisma.school.upsert({
    where: { slug: "nurul-huda-model-academy-gwagwalada" },
    update: {},
    create: {
      name: "Nurul Huda Model Academy, Gwagwalada",
      slug: "nurul-huda-model-academy-gwagwalada",
      areaCouncil: "Gwagwalada",
      level: SchoolLevel.COMBINED,
      arms: [SchoolArm.NURSERY, SchoolArm.PRIMARY, SchoolArm.JSS],
      principalName: "Hajiya Maryam Sani",
      email: "info@nurulhuda.example",
      phone: "+2348000000000",
      address: "Plot 14, Opposite Central Mosque, Gwagwalada, FCT",
      yearEstablished: 2008,
      description: "A sample approved member school record seeded for the AMIS FCT rebuild foundation.",
      photoUrl: "/seed/nurul-huda.jpg",
      ndprConsent: true,
      status: SchoolStatus.APPROVED,
      approvedAt: new Date(),
    },
  });

  await prisma.duesRecord.upsert({
    where: {
      schoolId_academicYear: {
        schoolId: school.id,
        academicYear: "2026/2027",
      },
    },
    update: {
      tier: DuesTier.TIER_3,
      amountDue: 120000,
      amountPaid: 120000,
      status: DuesStatus.PAID,
      notes: "Seeded sample dues record.",
    },
    create: {
      schoolId: school.id,
      academicYear: "2026/2027",
      tier: DuesTier.TIER_3,
      amountDue: 120000,
      amountPaid: 120000,
      status: DuesStatus.PAID,
      notes: "Seeded sample dues record.",
    },
  });

  await prisma.newsPost.upsert({
    where: { slug: "amis-fct-website-rebuild-kickoff" },
    update: {},
    create: {
      title: "AMIS FCT Website Rebuild Kicks Off",
      slug: "amis-fct-website-rebuild-kickoff",
      excerpt: "AMIS FCT has commenced a modern rebuild of its official digital platform.",
      body: "This seeded news record exists to verify the Phase 1 content schema and dynamic content pipeline.",
      category: NewsCategory.GENERAL_NEWS,
      status: PublishingStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "annual-principals-strategy-meeting-2026" },
    update: {
      galleryAlbums: {
        connectOrCreate: {
          where: { slug: "inter-school-quran-recitation-2025" },
          create: {
            title: "Inter-School Quran Recitation 2025",
            slug: "inter-school-quran-recitation-2025",
            summary: "Seeded album for upcoming gallery implementation.",
            coverImageUrl: "/seed/gallery-cover.jpg",
            photoUrls: ["/seed/gallery-1.jpg", "/seed/gallery-2.jpg", "/seed/gallery-3.jpg"],
            eventDate: new Date("2025-11-12T00:00:00.000Z"),
            status: PublishingStatus.PUBLISHED,
          },
        },
      },
    },
    create: {
      title: "Annual Principals Strategy Meeting 2026",
      slug: "annual-principals-strategy-meeting-2026",
      summary: "A seeded strategy meeting event for member school leaders.",
      description: "This seeded event helps validate the admin and public content architecture for upcoming features.",
      location: "AMIS FCT Secretariat, Abuja",
      eventType: EventType.ASSOCIATION_MEETING,
      startAt: new Date("2026-07-20T09:00:00.000Z"),
      endAt: new Date("2026-07-20T13:00:00.000Z"),
      registrationContact: "secretariat@amisfct.org",
      status: PublishingStatus.PUBLISHED,
      publishedAt: new Date(),
      galleryAlbums: {
        create: {
          title: "Inter-School Quran Recitation 2025",
          slug: "inter-school-quran-recitation-2025",
          summary: "Seeded album for upcoming gallery implementation.",
          coverImageUrl: "/seed/gallery-cover.jpg",
          photoUrls: ["/seed/gallery-1.jpg", "/seed/gallery-2.jpg", "/seed/gallery-3.jpg"],
          eventDate: new Date("2025-11-12T00:00:00.000Z"),
          status: PublishingStatus.PUBLISHED,
        },
      },
    },
  });

  await prisma.resourceFile.upsert({
    where: { slug: "circular-01-2026-transition-notice" },
    update: {},
    create: {
      title: "Transition Notice for the 2026 Academic Session",
      slug: "circular-01-2026-transition-notice",
      category: ResourceCategory.CIRCULAR,
      fileUrl: "/seed/circular-01-2026.pdf",
      fileName: "circular-01-2026.pdf",
      fileType: "application/pdf",
      fileSizeBytes: 245000,
      circularNumber: "Circular 01/2026",
      status: PublishingStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  await prisma.executiveMember.upsert({
    where: { id: "seed-executive-chairman" },
    update: {},
    create: {
      id: "seed-executive-chairman",
      fullName: "Alhaji Musa Ibrahim",
      title: "Executive Chairman",
      shortBio: "Seeded executive record for the initial leadership content model.",
      sortOrder: 1,
    },
  });

  const existingEnquiry = await prisma.contactEnquiry.findFirst({
    where: {
      email: "fatima@example.com",
      subject: "School Admissions",
    },
  });

  if (!existingEnquiry) {
    await prisma.contactEnquiry.create({
      data: {
        fullName: "Fatima Yusuf",
        email: "fatima@example.com",
        phone: "+2348012345678",
        subject: "School Admissions",
        message: "Please share approved member schools near Kubwa that offer both primary and junior secondary arms.",
        ndprConsent: true,
      },
    });
  }

  const existingNotification = await prisma.notification.findFirst({
    where: {
      subject: "Welcome to the AMIS FCT digital platform",
    },
  });

  if (!existingNotification) {
    await prisma.notification.create({
      data: {
        subject: "Welcome to the AMIS FCT digital platform",
        body: "This is a seeded notification record for future email integration.",
        audienceDescription: "All approved member schools",
        audienceFilters: { scope: "all_schools" },
        status: NotificationStatus.DRAFT,
        recipientCount: 1,
        senderId: admin.id,
      },
    });
  }

  console.log(`Seed complete. Super admin: ${superAdminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
