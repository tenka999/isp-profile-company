/*
  Warnings:

  - You are about to drop the column `kategori` on the `galeri` table. All the data in the column will be lost.
  - Added the required column `kategoriId` to the `Galeri` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `galeri` DROP COLUMN `kategori`,
    ADD COLUMN `kategoriId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `KategoriGaleri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Galeri` ADD CONSTRAINT `Galeri_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `KategoriGaleri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
