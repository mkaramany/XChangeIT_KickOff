INSERT INTO usabl."address"
(street_name, house_number, zip_code, city)
VALUES('street1', 12, 4444, 'city1');


INSERT INTO usabl."user" (first_name,last_name,email,"password",first_login,verification_code,profile_picture,address_id,role_code) VALUES 
('FName1','LName1','a@b.c','$2y$12$H.28MAcm/ktLa.z25NNZc.lcnSaIUM2jCTbqOl.wES0ttWWUQ6oPi',true,12345,NULL,1,'ROLE_ADMIN')
,('FName2','LName2','x@y.z','$2y$12$H.28MAcm/ktLa.z25NNZc.lcnSaIUM2jCTbqOl.wES0ttWWUQ6oPi',true,12345,NULL,1,'ROLE_USER')
;


INSERT INTO usabl."item"
(title, description, status, owner_id)
VALUES('T1', 'Description1', 'AVAILABLE', 1);

INSERT INTO usabl."item"
(title, description, status, owner_id)
VALUES('T2', 'Description2', 'TAKEN', 1);


INSERT INTO usabl.slot
("date", "from", "to", item_id)
VALUES('2020-08-19', CURRENT_TIME(2), CURRENT_TIME(2), 1);

INSERT INTO usabl.slot
("date", "from", "to", item_id)
VALUES('2020-09-14', CURRENT_TIME(2), CURRENT_TIME(2), 1);