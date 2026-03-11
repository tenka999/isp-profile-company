/*
  Warnings:

  - Added the required column `kategori` to the `Faq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact` ADD COLUMN `catatanAdmin` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('NEW', 'READ', 'FOLLOWED_UP') NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE `faq` ADD COLUMN `helpful` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `kategori` ENUM('UMUM', 'PEMBAYARAN', 'TEKNIS', 'LAINNYA') NOT NULL,
    ADD COLUMN `notHelpful` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `urutan` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `views` INTEGER NOT NULL DEFAULT 0;
