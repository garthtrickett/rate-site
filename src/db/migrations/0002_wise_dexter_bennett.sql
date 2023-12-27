ALTER TABLE `user_session` MODIFY COLUMN `id` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `auth_user` MODIFY COLUMN `id` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `auth_user` DROP COLUMN `names`;--> statement-breakpoint
ALTER TABLE `auth_user` DROP COLUMN `last_names`;