
-- Drop table

-- DROP TABLE usabl.address;

CREATE TABLE usabl.address (
	id serial NOT NULL,
	street_name varchar(255) NOT NULL,
	house_number int4 NOT NULL,
	zip_code varchar NOT NULL,
	city varchar(50) NOT NULL,
	CONSTRAINT "Address_pk" PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE usabl.item_status_lookup;

CREATE TABLE usabl.item_status_lookup (
	id serial NOT NULL,
	status_code varchar(50) NOT NULL,
	status_name varchar(50) NOT NULL,
	CONSTRAINT "Item_Status_Lookup_pk" PRIMARY KEY (id),
	CONSTRAINT "Item_Status_Lookup_status_code_key" UNIQUE (status_code)
);

-- Drop table

-- DROP TABLE usabl."role";

CREATE TABLE usabl."role" (
	id serial NOT NULL,
	role_code varchar(50) NOT NULL,
	role_name varchar(50) NOT NULL,
	CONSTRAINT role_pk PRIMARY KEY (id),
	CONSTRAINT role_role_code_key UNIQUE (role_code),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);

-- Drop table

-- DROP TABLE usabl."user";

CREATE TABLE usabl."user" (
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
	CONSTRAINT "User_email_key" UNIQUE (email),
	CONSTRAINT "User_pk" PRIMARY KEY (id),
	CONSTRAINT "User_fk0" FOREIGN KEY (address_id) REFERENCES usabl.address(id),
	CONSTRAINT user_fk1 FOREIGN KEY (role_code) REFERENCES usabl.role(role_code)
);

-- Drop table

-- DROP TABLE usabl.item;

CREATE TABLE usabl.item (
	id serial NOT NULL,
	title varchar(255) NOT NULL,
	description varchar(1000) NOT NULL,
	status varchar(30) NOT NULL,
	owner_id int4 NOT NULL,
	receiver_id int4 NULL,
	deleted bool NULL DEFAULT false,
	publish_date timestamp NULL,
	last_modified_date timestamp NULL,
	thumbnail bytea NULL,
	CONSTRAINT "Item_pk" PRIMARY KEY (id),
	CONSTRAINT "Item_fk0" FOREIGN KEY (status) REFERENCES usabl.item_status_lookup(status_code),
	CONSTRAINT "Item_fk1" FOREIGN KEY (owner_id) REFERENCES usabl."user"(id),
	CONSTRAINT item_fk FOREIGN KEY (receiver_id) REFERENCES usabl."user"(id)
);

-- Drop table

-- DROP TABLE usabl.item_images;

CREATE TABLE usabl.item_images (
	id serial NOT NULL,
	image bytea NOT NULL,
	item_id int4 NULL,
	primary_image bool NULL,
	CONSTRAINT "Item_Images_pk" PRIMARY KEY (id),
	CONSTRAINT "Item_Images_fk0" FOREIGN KEY (item_id) REFERENCES usabl.item(id)
);

-- Drop table

-- DROP TABLE usabl.slot;

CREATE TABLE usabl.slot (
	id serial NOT NULL,
	slot_date date NULL,
	slot_from time NULL,
	slot_to time NULL,
	item_id int4 NULL,
	is_reserved bool NULL DEFAULT false,
	CONSTRAINT "Slot_pk" PRIMARY KEY (id),
	CONSTRAINT "Slot_fk0" FOREIGN KEY (item_id) REFERENCES usabl.item(id)
);
