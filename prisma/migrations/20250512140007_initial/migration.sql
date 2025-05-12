-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegacyPage" (
    "id" TEXT NOT NULL,
    "pageType" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "honoureeName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "dateOfPassing" TIMESTAMP(3),
    "creatorName" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "coverPhoto" TEXT,
    "honoureePhoto" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegacyPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralKnowledge" (
    "id" TEXT NOT NULL,
    "personality" TEXT,
    "values" TEXT,
    "beliefs" TEXT,
    "legacyPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneralKnowledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaItem" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "dateTaken" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "legacyPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "rsvpBy" TIMESTAMP(3),
    "location" TEXT NOT NULL,
    "description" TEXT,
    "message" TEXT,
    "legacyPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legacyPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "legacyPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemorialDetails" (
    "id" TEXT NOT NULL,
    "funeralWishes" TEXT,
    "obituary" TEXT,
    "funeralHome" TEXT,
    "viewingDate" TIMESTAMP(3),
    "viewingTime" TEXT,
    "viewingLocation" TEXT,
    "viewingDetails" TEXT,
    "processionDate" TIMESTAMP(3),
    "processionTime" TEXT,
    "processionLocation" TEXT,
    "processionDetails" TEXT,
    "serviceDate" TIMESTAMP(3),
    "serviceTime" TEXT,
    "serviceLocation" TEXT,
    "serviceDetails" TEXT,
    "finalRestingPlace" TEXT,
    "finalRestingAddress" TEXT,
    "finalRestingPlot" TEXT,
    "finalRestingDetails" TEXT,
    "eulogy" TEXT,
    "legacyPageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemorialDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LegacyPage_slug_key" ON "LegacyPage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LegacyPage_userId_key" ON "LegacyPage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralKnowledge_legacyPageId_key" ON "GeneralKnowledge"("legacyPageId");

-- CreateIndex
CREATE UNIQUE INDEX "MemorialDetails_legacyPageId_key" ON "MemorialDetails"("legacyPageId");
