/*
  Warnings:

  - A unique constraint covering the columns `[userId,layananId]` on the table `Ulasan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `Ulasan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ulasan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ulasan` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `helpfulCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `layananId` INTEGER NULL,
    ADD COLUMN `rating` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ulasan_userId_layananId_key` ON `Ulasan`(`userId`, `layananId`);

-- AddForeignKey
ALTER TABLE `Ulasan` ADD CONSTRAINT `Ulasan_layananId_fkey` FOREIGN KEY (`layananId`) REFERENCES `Layanan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
