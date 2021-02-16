ALTER TABLE usabl."user" ALTER COLUMN "password" DROP NOT NULL;
ALTER TABLE usabl."user" ALTER COLUMN first_login DROP NOT NULL;
ALTER TABLE usabl."user" ALTER COLUMN verification_code DROP NOT NULL;
ALTER TABLE usabl."user" ALTER COLUMN address_id DROP NOT NULL;
ALTER TABLE usabl."user" ADD profile_picture_url varchar NULL;


--Validating existing accounts---
ALTER TABLE usabl."user" ADD provider varchar NULL;

