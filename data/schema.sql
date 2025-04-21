CREATE DATABASE `franchise_leads_management`;

CREATE TABLE `upload_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `upload_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `metadata` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `leads_database` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_of_lead` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `franchise_developer_name` varchar(255) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `date_of_campaign` date DEFAULT NULL,
  `month` varchar(20) DEFAULT NULL,
  `financial_year` varchar(10) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `notes` text,
  `revenue_amount` decimal(10,2) DEFAULT NULL,
  `team_leader_assign` varchar(255) DEFAULT NULL,
  `lead_update_status` enum('Updated','Not Updated') DEFAULT NULL,
  `leadType` varchar(100) DEFAULT NULL,
  `remark` text,
  PRIMARY KEY (`id`)
);


CREATE TABLE `promotions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('WhatsApp Business','Email','Phone Call') NOT NULL,
  `status` enum('Active','Scheduled','Completed') NOT NULL,
  `scheduled_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE `promotion_leads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int NOT NULL,
  `lead_id` int NOT NULL,
  `status` enum('Pending','Sent','Failed','Opened','Clicked','Responded') NOT NULL     DEFAULT 'Pending',
  `sent_at` timestamp NULL DEFAULT NULL,
  `opened_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `promotion_id` (`promotion_id`),
  KEY `lead_id` (`lead_id`),
  CONSTRAINT `promotion_leads_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `promotion_leads_ibfk_2` FOREIGN KEY (`lead_id`) REFERENCES `leads_database` (`id`) ON DELETE CASCADE
);

CREATE TABLE `promotion_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('WhatsApp Business','Email','Phone Call') NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
); 


CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int NOT NULL,
  `lead_id` int NOT NULL,
  `type` enum('WhatsApp Business','Email','Phone Call') NOT NULL,
  `content` text NOT NULL,
  `status` enum('Pending','Sent','Failed','Delivered','Read','Replied') NOT NULL DEFAULT 'Pending',
  `sent_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `replied_at` timestamp NULL DEFAULT NULL,
  `call_duration` int DEFAULT NULL COMMENT 'Duration of call in seconds',
  `call_notes` text COMMENT 'Notes from the phone call',
  `call_disposition` enum('Answered','No Answer','Voicemail','Busy','Wrong Number','Disconnected','Follow Up Required') DEFAULT NULL COMMENT 'Outcome of the call attempt',
  PRIMARY KEY (`id`),
  KEY `promotion_id` (`promotion_id`),
  KEY `lead_id` (`lead_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`lead_id`) REFERENCES `leads_database` (`id`) ON DELETE CASCADE
) ;


CREATE TABLE `attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_size` int NOT NULL,
  `file_type` varchar(100) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `promotion_id` (`promotion_id`),
  CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE
) ;




