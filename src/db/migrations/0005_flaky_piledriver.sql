ALTER TABLE `customer` MODIFY COLUMN `user_id` varchar(15);--> statement-breakpoint
ALTER TABLE `professional` MODIFY COLUMN `user_id` varchar(191);--> statement-breakpoint
ALTER TABLE `auth_user` MODIFY COLUMN `id` varchar(15) NOT NULL;