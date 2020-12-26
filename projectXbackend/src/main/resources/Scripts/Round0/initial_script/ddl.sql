-- xchangeit.address definition

-- Drop table

-- DROP TABLE xchangeit.address;

CREATE TABLE xchangeit.address (
	id serial NOT NULL,
	street_name varchar(255) NULL,
	house_number int4 NULL,
	zip_code varchar NULL,
	city varchar(50) NULL,
	CONSTRAINT "Address_pk" PRIMARY KEY (id)
);


-- xchangeit.item_condition_lookup definition

-- Drop table

-- DROP TABLE xchangeit.item_condition_lookup;

CREATE TABLE xchangeit.item_condition_lookup (
	id serial NOT NULL,
	condition_code varchar(50) NOT NULL,
	condition_name varchar(50) NOT NULL,
	CONSTRAINT "Item_Condition_Lookup_code_key" UNIQUE (condition_code),
	CONSTRAINT "Item_Condition_Lookup_pk" PRIMARY KEY (id)
);


-- xchangeit.item_status_lookup definition

-- Drop table

-- DROP TABLE xchangeit.item_status_lookup;

CREATE TABLE xchangeit.item_status_lookup (
	id serial NOT NULL,
	status_code varchar(50) NOT NULL,
	status_name varchar(50) NOT NULL,
	CONSTRAINT "Item_Status_Lookup_pk" PRIMARY KEY (id),
	CONSTRAINT "Item_Status_Lookup_status_code_key" UNIQUE (status_code)
);


-- xchangeit.item_type_lookup definition

-- Drop table

-- DROP TABLE xchangeit.item_type_lookup;

CREATE TABLE xchangeit.item_type_lookup (
	id serial NOT NULL,
	type_code varchar(50) NOT NULL,
	type_name varchar(50) NOT NULL,
	CONSTRAINT "Item_Type_Lookup_code_key" UNIQUE (type_code),
	CONSTRAINT "Item_Type_Lookup_pk" PRIMARY KEY (id)
);


-- xchangeit.request_state_lookup definition

-- Drop table

-- DROP TABLE xchangeit.request_state_lookup;

CREATE TABLE xchangeit.request_state_lookup (
	id serial NOT NULL,
	request_state_code varchar(50) NOT NULL,
	request_state_name varchar(50) NOT NULL,
	CONSTRAINT "request_state_Lookup_code_key" UNIQUE (request_state_code),
	CONSTRAINT "request_state_Lookup_pk" PRIMARY KEY (id)
);


-- xchangeit."role" definition

-- Drop table

-- DROP TABLE xchangeit."role";

CREATE TABLE xchangeit."role" (
	id serial NOT NULL,
	role_code varchar(50) NOT NULL,
	role_name varchar(50) NOT NULL,
	CONSTRAINT role_pk PRIMARY KEY (id),
	CONSTRAINT role_role_code_key UNIQUE (role_code),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);


-- xchangeit."user" definition

-- Drop table

-- DROP TABLE xchangeit."user";

CREATE TABLE xchangeit."user" (
	id serial NOT NULL,
	first_name varchar(80) NOT NULL,
	last_name varchar(80) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NULL,
	first_login bool NULL DEFAULT true,
	verification_code int4 NULL,
	profile_picture bytea NULL,
	address_id int4 NULL,
	role_code varchar(50) NOT NULL,
	profile_picture_url varchar NULL,
	provider varchar NULL,
	default_lang varchar NULL DEFAULT 'en'::character varying,
	CONSTRAINT "User_email_key" UNIQUE (email),
	CONSTRAINT "User_pk" PRIMARY KEY (id),
	CONSTRAINT "User_fk0" FOREIGN KEY (address_id) REFERENCES xchangeit.address(id),
	CONSTRAINT user_fk1 FOREIGN KEY (role_code) REFERENCES xchangeit.role(role_code)
);


-- xchangeit.item definition

-- Drop table

-- DROP TABLE xchangeit.item;

CREATE TABLE xchangeit.item (
	id serial NOT NULL,
	title varchar(255) NOT NULL,
	description varchar(1000) NOT NULL,
	status varchar(30) NOT NULL,
	owner_id int4 NOT NULL,
	receiver_id int4 NULL,
	publish_date timestamp NULL,
	last_modified_date timestamp NULL,
	thumbnail bytea NULL,
	"type" varchar NULL,
	"condition" varchar NULL,
	deleted bool NOT NULL DEFAULT false,
	CONSTRAINT "Item_pk" PRIMARY KEY (id),
	CONSTRAINT "Item_fk0" FOREIGN KEY (status) REFERENCES xchangeit.item_status_lookup(status_code),
	CONSTRAINT "Item_fk1" FOREIGN KEY (owner_id) REFERENCES xchangeit."user"(id),
	CONSTRAINT item_fk FOREIGN KEY (receiver_id) REFERENCES xchangeit."user"(id)
);


-- xchangeit.item_images definition

-- Drop table

-- DROP TABLE xchangeit.item_images;

CREATE TABLE xchangeit.item_images (
	id serial NOT NULL,
	image bytea NOT NULL,
	item_id int4 NULL,
	primary_image bool NULL,
	CONSTRAINT "Item_Images_pk" PRIMARY KEY (id),
	CONSTRAINT "Item_Images_fk0" FOREIGN KEY (item_id) REFERENCES xchangeit.item(id)
);


-- xchangeit.slot definition

-- Drop table

-- DROP TABLE xchangeit.slot;

CREATE TABLE xchangeit.slot (
	id serial NOT NULL,
	slot_date date NULL,
	slot_from time NULL,
	slot_to time NULL,
	item_id int4 NULL,
	is_reserved bool NULL DEFAULT false,
	CONSTRAINT "Slot_pk" PRIMARY KEY (id),
	CONSTRAINT "Slot_fk0" FOREIGN KEY (item_id) REFERENCES xchangeit.item(id)
);