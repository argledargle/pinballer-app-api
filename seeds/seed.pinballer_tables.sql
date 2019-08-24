BEGIN;

    TRUNCATE pinballer_locations, pinballer_machines, pinballer_users, pinballer_scores
RESTART IDENTITY CASCADE;

    INSERT INTO pinballer_locations
        (location_id, location_name, location_address)
    VALUES
        (1, 'Up Down', '615 E Brady St, Milwaukee, WI 53202'),
        (2, 'Art Bar', '722 E Burleigh St, Milwaukee, WI 53212'),
        (3, 'The Uptowner', '1032 E Center St, Milwaukee, WI 53212');

    INSERT INTO pinballer_machines
        (machine_id, machine_name, location_id)
    VALUES
        (1, 'Mars Attacks!', 1),
        (2, 'Metallica', 2),
        (3, 'Medieval Madness', 3);

    INSERT INTO pinballer_users
        (user_id, user_fist_name, user_last_name, user_nick_name, user_email, user_password)
    VALUES
        (1, 'Alex', 'Peter', 'Argledargle', 'apyells@gmail.com', 'password1'),
        (2, 'Matt', 'Schalawadlier', 'Matty Bombatty', 'noreply@yahoo.com', 'password2'),
        (3, 'Nina', 'Morales', 'La Nina', 'noreply@microsoft.com', 'password3');

    INSERT INTO pinballer_scores
        (score_id, score_value, user_id, machine_id, score_date)
    VALUES
        (1, 30120460, 1, 1, 8/23/2019),
        (2, 16527380, 2, 3, 7/16/2019),
        (3, 4135040, 3, 2, 4/15/2019);

    COMMIT;