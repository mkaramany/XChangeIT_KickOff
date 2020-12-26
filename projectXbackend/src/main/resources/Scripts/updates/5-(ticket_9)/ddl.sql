ALTER TABLE usabl."user" ALTER COLUMN first_name TYPE varchar(80) USING first_name::varchar;
ALTER TABLE usabl."user" ALTER COLUMN last_name TYPE varchar(80) USING last_name::varchar;
