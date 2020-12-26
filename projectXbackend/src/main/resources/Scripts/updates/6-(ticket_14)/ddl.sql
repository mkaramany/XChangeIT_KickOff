ALTER TABLE usabl.item ADD deleted bool NULL DEFAULT false;
ALTER TABLE usabl.item ADD publish_date timestamp NULL;
ALTER TABLE usabl.item ADD last_modified_date timestamp NULL;
ALTER TABLE usabl.item ADD thumbnail bytea NULL;

UPDATE
	USABL.ITEM
SET
	PUBLISH_DATE = CURRENT_TIMESTAMP
	

