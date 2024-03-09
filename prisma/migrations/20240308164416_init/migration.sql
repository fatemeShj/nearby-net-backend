-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFeedbacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `targetUserId` INTEGER NOT NULL,
    `sourceUserId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserFeedbacks` ADD CONSTRAINT `UserFeedbacks_targetUserId_fkey` FOREIGN KEY (`targetUserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFeedbacks` ADD CONSTRAINT `UserFeedbacks_sourceUserId_fkey` FOREIGN KEY (`sourceUserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
