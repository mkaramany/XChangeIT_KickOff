ALTER TABLE usabl.slot ADD is_reserved bool NULL;
ALTER TABLE usabl.slot ALTER COLUMN is_reserved SET DEFAULT false;

ALTER TABLE usabl.item ADD receiver_id int NULL;
ALTER TABLE usabl.item ADD CONSTRAINT item_fk FOREIGN KEY (receiver_id) REFERENCES usabl."user"(id);

