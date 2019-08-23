
-- Drop table

-- DROP TABLE pinballer_users;

CREATE TABLE pinballer_users
(
    user_id int4 NOT NULL
    GENERATED BY DEFAULT AS IDENTITY,
	user_first_name varchar
    (255) NOT NULL,
	user_last_name varchar
    (255) NOT NULL,
	user_nick_name varchar
    (255) NOT NULL,
	user_email varchar
    (255) NOT NULL,
	user_password varchar
    (255) NOT NULL,
	CONSTRAINT pinballer_users_pk PRIMARY KEY
    (user_id)
);