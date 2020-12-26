ALTER TABLE item_images ADD primary_image bool NULL;

ALTER TABLE slot 
RENAME COLUMN "date" TO "slot_date";

ALTER TABLE slot 
RENAME COLUMN "from" TO "slot_from";

ALTER TABLE slot 
RENAME COLUMN "to" TO "slot_to";

ALTER TABLE item_images ALTER COLUMN item_id DROP NOT NULL;


ALTER TABLE slot ALTER COLUMN item_id DROP NOT NULL;
ALTER TABLE slot ALTER COLUMN "slot_to" DROP NOT NULL;
ALTER TABLE slot ALTER COLUMN "slot_from" DROP NOT NULL;
ALTER TABLE slot ALTER COLUMN "slot_date" DROP NOT NULL;

