/*
  Warnings:

  - The primary key for the `client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `commande` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `commande` DROP FOREIGN KEY `commande_CliId_fkey`;

-- DropForeignKey
ALTER TABLE `compteclient` DROP FOREIGN KEY `CompteClient_CliId_fkey`;

-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `facture_code_cmd_fkey`;

-- DropForeignKey
ALTER TABLE `rapport` DROP FOREIGN KEY `Rapport_CliId_fkey`;

-- AlterTable
ALTER TABLE `client` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `commande` DROP PRIMARY KEY,
    MODIFY `CliId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `compteclient` MODIFY `CliId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `facture` MODIFY `code_cmd` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `rapport` MODIFY `CliId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_CliId_fkey` FOREIGN KEY (`CliId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_code_cmd_fkey` FOREIGN KEY (`code_cmd`) REFERENCES `commande`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompteClient` ADD CONSTRAINT `CompteClient_CliId_fkey` FOREIGN KEY (`CliId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_CliId_fkey` FOREIGN KEY (`CliId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
