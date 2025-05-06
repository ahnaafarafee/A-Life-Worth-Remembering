/*
  Warnings:

  - You are about to drop the column `coverPhotoUrl` on the `legacypage` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageUrl` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `LegacyPage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `LegacyPage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateOfBirth` to the `LegacyPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `LegacyPage` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clerkUserId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `legacypage` DROP FOREIGN KEY `LegacyPage_userId_fkey`;

-- DropIndex
DROP INDEX `LegacyPage_userId_fkey` ON `legacypage`;

-- AlterTable
ALTER TABLE `legacypage` DROP COLUMN `coverPhotoUrl`,
    ADD COLUMN `coverPhoto` VARCHAR(191) NULL,
    ADD COLUMN `dateOfBirth` DATETIME(3) NOT NULL,
    ADD COLUMN `dateOfPassing` DATETIME(3) NULL,
    ADD COLUMN `honoureePhoto` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `imageUrl`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `clerkUserId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `GeneralKnowledge` (
    `id` VARCHAR(191) NOT NULL,
    `personality` TEXT NULL,
    `values` TEXT NULL,
    `beliefs` TEXT NULL,
    `legacyPageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GeneralKnowledge_legacyPageId_key`(`legacyPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaItem` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `dateTaken` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `legacyPageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `rsvpBy` DATETIME(3) NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `message` TEXT NULL,
    `legacyPageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relationship` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `legacyPageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Insight` (
    `id` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `legacyPageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `LegacyPage_slug_key` ON `LegacyPage`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `LegacyPage_userId_key` ON `LegacyPage`(`userId`);

-- AddForeignKey
ALTER TABLE `LegacyPage` ADD CONSTRAINT `LegacyPage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneralKnowledge` ADD CONSTRAINT `GeneralKnowledge_legacyPageId_fkey` FOREIGN KEY (`legacyPageId`) REFERENCES `LegacyPage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediaItem` ADD CONSTRAINT `MediaItem_legacyPageId_fkey` FOREIGN KEY (`legacyPageId`) REFERENCES `LegacyPage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_legacyPageId_fkey` FOREIGN KEY (`legacyPageId`) REFERENCES `LegacyPage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relationship` ADD CONSTRAINT `Relationship_legacyPageId_fkey` FOREIGN KEY (`legacyPageId`) REFERENCES `LegacyPage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Insight` ADD CONSTRAINT `Insight_legacyPageId_fkey` FOREIGN KEY (`legacyPageId`) REFERENCES `LegacyPage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
