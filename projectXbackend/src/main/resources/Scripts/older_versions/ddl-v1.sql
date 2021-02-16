CREATE TABLE "user" (
	"id" serial NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"first_login" BOOLEAN NOT NULL DEFAULT 'true',
	"verification_code" int NOT NULL,
	"profile_picture" bytea,
	"address_id" int NOT NULL,
	"role_code" varchar(50) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "address" (
	"id" serial NOT NULL,
	"street_name" varchar(255) NOT NULL,
	"house_number" int NOT NULL,
	"zip_code" int NOT NULL,
	"city" varchar(50) NOT NULL,
	CONSTRAINT "address_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "item" (
	"id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"status" varchar(30) NOT NULL,
	"owner_id" int NOT NULL,
	CONSTRAINT "item_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "slot" (
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"from" TIME NOT NULL,
	"to" TIME NOT NULL,
	"item_id" int NOT NULL,
	CONSTRAINT "slot_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "item_images" (
	"id" serial NOT NULL,
	"image" bytea NOT NULL,
	"item_id" int NOT NULL,
	CONSTRAINT "item_images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "item_status_lookup" (
	"id" serial NOT NULL,
	"status_code" varchar(50) NOT NULL UNIQUE,
	"status_name" varchar(50) NOT NULL,
	CONSTRAINT "item_status_lookup_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "role" (
	"id" serial NOT NULL,
	"role_code" varchar(50) NOT NULL UNIQUE,
	"role_name" varchar(50) NOT NULL UNIQUE,
	CONSTRAINT "role_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("address_id") REFERENCES "address"("id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk1" FOREIGN KEY ("role_code") REFERENCES "role"("role_code");


ALTER TABLE "item" ADD CONSTRAINT "item_fk0" FOREIGN KEY ("status") REFERENCES "item_status_lookup"("status_code");
ALTER TABLE "item" ADD CONSTRAINT "item_fk1" FOREIGN KEY ("owner_id") REFERENCES "user"("id");

ALTER TABLE "slot" ADD CONSTRAINT "slot_fk0" FOREIGN KEY ("item_id") REFERENCES "item"("id");

ALTER TABLE "item_images" ADD CONSTRAINT "item_images_fk0" FOREIGN KEY ("item_id") REFERENCES "item"("id");



