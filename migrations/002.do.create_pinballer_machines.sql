CREATE TABLE
IF NOT EXISTS pinballer_machines
(
	machine_id int NOT NULL
	GENERATED BY DEFAULT AS IDENTITY,
	machine_name varchar
(255) NOT NULL,
	location_id int NULL,
	CONSTRAINT pinballer_machine_pk PRIMARY KEY
(machine_id)
);

ALTER TABLE pinballer_machines ADD CONSTRAINT pinballer_machine_fk FOREIGN KEY (location_id) REFERENCES pinballer_locations(location_id);
