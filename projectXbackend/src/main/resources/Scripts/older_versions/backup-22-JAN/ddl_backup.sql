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


-- xchangeit.item_activity_type_lookup definition

-- Drop table

-- DROP TABLE xchangeit.item_activity_type_lookup;

CREATE TABLE xchangeit.item_activity_type_lookup (
	id int4 NULL,
	activity_code varchar NULL,
	activity_name varchar NULL
);


-- xchangeit.item_age_lookup definition

-- Drop table

-- DROP TABLE xchangeit.item_age_lookup;

CREATE TABLE xchangeit.item_age_lookup (
	id int4 NOT NULL,
	age_code varchar NULL,
	age_name varchar NULL,
	CONSTRAINT item_age_lookup_pk PRIMARY KEY (id)
);


-- xchangeit.item_category_lookup definition

-- Drop table

-- DROP TABLE xchangeit.item_category_lookup;

CREATE TABLE xchangeit.item_category_lookup (
	id int4 NULL,
	category_code varchar NULL,
	category_name varchar NULL
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


-- xchangeit.area definition

-- Drop table

-- DROP TABLE xchangeit.area;

CREATE TABLE xchangeit.area (
	id int4 NOT NULL,
	code varchar NOT NULL,
	"name" varchar NULL,
	CONSTRAINT area_pk PRIMARY KEY (id),
	CONSTRAINT area_un UNIQUE (code)
);


-- xchangeit.user_location definition

-- Drop table

-- DROP TABLE xchangeit.user_location;

CREATE TABLE xchangeit.user_location (
	id int4 NOT NULL,
	area int4 NOT NULL,
	location_details varchar NULL,
	CONSTRAINT user_location_pk PRIMARY KEY (id),
	CONSTRAINT user_location_fk FOREIGN KEY (area) REFERENCES xchangeit.area(id)
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
	phone_number varchar NULL,
	location_id int4 NULL,
	CONSTRAINT "User_email_key" UNIQUE (email),
	CONSTRAINT "User_pk" PRIMARY KEY (id),
	CONSTRAINT "User_fk0" FOREIGN KEY (address_id) REFERENCES xchangeit.address(id),
	CONSTRAINT user_fk FOREIGN KEY (location_id) REFERENCES xchangeit.user_location(id),
	CONSTRAINT user_fk1 FOREIGN KEY (role_code) REFERENCES xchangeit.role(role_code)
);


-- xchangeit.user_reviews definition

-- Drop table

-- DROP TABLE xchangeit.user_reviews;

CREATE TABLE xchangeit.user_reviews (
	id int4 NOT NULL,
	user_id int4 NULL,
	review varchar NULL,
	review_by int4 NULL,
	review_date date NULL,
	CONSTRAINT user_reviews_pk PRIMARY KEY (id),
	CONSTRAINT user_reviews_fk FOREIGN KEY (user_id) REFERENCES xchangeit."user"(id),
	CONSTRAINT user_reviews_fk_1 FOREIGN KEY (review_by) REFERENCES xchangeit."user"(id)
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
	price float8 NULL,
	deposit float8 NULL,
	cancellation_fees varchar NULL,
	age varchar NULL,
	category varchar NULL,
	activity_type varchar NULL,
	"location" varchar NULL,
	total_rating float8 NULL,
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


-- xchangeit.item_ratings definition

-- Drop table

-- DROP TABLE xchangeit.item_ratings;

CREATE TABLE xchangeit.item_ratings (
	id int4 NOT NULL,
	rating varchar NULL,
	raing_date date NULL,
	rating_by int4 NOT NULL,
	item_id int4 NULL,
	CONSTRAINT item_ratings_pk PRIMARY KEY (id),
	CONSTRAINT item_ratings_fk FOREIGN KEY (item_id) REFERENCES xchangeit.item(id),
	CONSTRAINT item_ratings_fk_1 FOREIGN KEY (rating_by) REFERENCES xchangeit."user"(id)
);


-- xchangeit.item_reviews definition

-- Drop table

-- DROP TABLE xchangeit.item_reviews;

CREATE TABLE xchangeit.item_reviews (
	id int4 NOT NULL,
	item_id int4 NULL,
	review varchar NULL,
	review_by int4 NULL,
	review_date date NULL,
	CONSTRAINT item_reviews_pk PRIMARY KEY (id),
	CONSTRAINT item_reviews_fk FOREIGN KEY (item_id) REFERENCES xchangeit.item(id),
	CONSTRAINT item_reviews_fk_1 FOREIGN KEY (review_by) REFERENCES xchangeit."user"(id)
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