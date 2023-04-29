/*
  Warnings:

  - The primary key for the `card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Prix` on the `carditem` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `Nom` on the `commercant` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `commercant` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `commercant` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `facture` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `livreur` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `prix` on the `produit` table. All the data in the column will be lost.
  - Added the required column `Prix_card` to the `CardItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomCli` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneCli` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenomCli` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAchived` to the `Com_objective` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NomCom` to the `commercant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneCom` to the `commercant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenomCom` to the `commercant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneliv` to the `livreur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom_Produit` to the `produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prix_produit` to the `produit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carditem` DROP FOREIGN KEY `CardItem_idCard_fkey`;

-- DropForeignKey
ALTER TABLE `commande` DROP FOREIGN KEY `commande_idCard_fkey`;

-- AlterTable
ALTER TABLE `card` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `carditem` DROP COLUMN `Prix`,
    ADD COLUMN `Prix_card` DOUBLE NOT NULL,
    MODIFY `idCard` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `client` DROP COLUMN `nom`,
    DROP COLUMN `phone`,
    DROP COLUMN `prenom`,
    ADD COLUMN `nomCli` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneCli` VARCHAR(191) NOT NULL,
    ADD COLUMN `prenomCli` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `com_objective` ADD COLUMN `isAchived` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `commande` MODIFY `idCard` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `commercant` DROP COLUMN `Nom`,
    DROP COLUMN `phone`,
    DROP COLUMN `prenom`,
    ADD COLUMN `NomCom` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneCom` VARCHAR(191) NOT NULL,
    ADD COLUMN `prenomCom` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `facture` DROP COLUMN `date`,
    ADD COLUMN `dateFact` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `livreur` DROP COLUMN `phone`,
    ADD COLUMN `phoneliv` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `produit` DROP COLUMN `nom`,
    DROP COLUMN `prix`,
    ADD COLUMN `nom_Produit` VARCHAR(191) NOT NULL,
    ADD COLUMN `prix_produit` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `commande` ADD CONSTRAINT `commande_idCard_fkey` FOREIGN KEY (`idCard`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardItem` ADD CONSTRAINT `CardItem_idCard_fkey` FOREIGN KEY (`idCard`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
