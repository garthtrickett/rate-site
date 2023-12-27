CREATE TABLE `commonReviewFields` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`rating` int,
	`comments` varchar(1024),
	CONSTRAINT `commonReviewFields_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(256),
	`user_id` varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `organisationReview` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`commonReviewFieldsId` int,
	`organisationId` int,
	`customerId` int,
	CONSTRAINT `organisationReview_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organisation` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `organisation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professionalOrganisationMapping` (
	`professionalId` int NOT NULL,
	`organisationId` int NOT NULL,
	CONSTRAINT `professionalOrganisationMapping_professionalId_organisationId_pk` PRIMARY KEY(`professionalId`,`organisationId`)
);
--> statement-breakpoint
CREATE TABLE `professionalReview` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`professionalId` int,
	`commonReviewFieldsId` int,
	`customerId` int,
	CONSTRAINT `professionalReview_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`user_id` varchar(15) NOT NULL,
	CONSTRAINT `professional_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `auth_user` ADD `user_type` varchar(50);