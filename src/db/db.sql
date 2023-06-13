-- 1 - student
-- 2 - teacher
-- 3 - admin

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- courses
DROP TABLE IF EXISTS courses;
CREATE TABLE courses(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    price VARCHAR(64) NOT NULL,
    description VARCHAR(512),
    photo VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- groups
DROP TABLE IF EXISTS groups;
CREATE TABLE groups(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- users
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    password VARCHAR(256) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    status INT DEFAULT 1,
    info VARCHAR,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
    image VARCHAR,
    study_at VARCHAR(256),
    state INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

insert into users( name, password, phone, status, image)
values ('ubk', '1q2w3e4r', '+998887776655', 3, 'https://www.tu-ilmenau.de/unionline/fileadmin/_processed_/0/0/csm_Person_Yury_Prof_Foto_AnLI_Footgrafie__2_.JPG_94f12fbf25.jpg');


-- alter table users add column study_at VARCHAR;
-- alter table users add column state integer default 1;


--student_groups
DROP TABLE IF EXISTS student_groups;

CREATE TABLE student_groups(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    group_id  UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);


-- news
DROP TABLE IF EXISTS news;
CREATE TABLE news(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    text VARCHAR NOT NULL,
    photo VARCHAR,
    status boolean NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- appeals
DROP TABLE IF EXISTS appeals;

CREATE TABLE appeals(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    message VARCHAR,
    answered boolean default FALSE,
    course_id UUID REFERENCES courses(id) on DELETE CASCADE,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);







-- GET APPEALS
select
    a.id,
    a.name,
    a.phone,
    a.message,
    a.answered,
    c.title,
    to_char(a.created_at, 'DD/MM/YYYY HH:MM:SS') as created_at
from
    appeals a
LEFT JOIN
    courses c
ON
    c.id = a.course_id
ORDER BY
    a.created_at DESC;

SELECT
    s.id,
    s.name,
    c.title as course,
    g.title as group,
    s.password,
    s.phone,
    s.image,
    TO_CHAR(s.created_at, 'DD/MM/YYY HH:MM:SS') as created_at
FROM
    users s
JOIN
    student_groups sg
ON
    s.id = sg.student_id
JOIN
    groups g
ON
    g.id = sg.group_id
JOIN
    courses c
ON
    g.course_id = c.id
WHERE
    s.status = 1;


SELECT
    u.id,
    u.name,
    u.phone,
    u.info,
    c.title as course,
    u.image,
    to_char(u.created_at, 'DD-MM-YYYY') AS created_at
FROM
    users u
LEFT JOIN
    courses c
ON
    u.course_id = c.id
WHERE
    u.status = 4 AND u.state = 1
ORDER BY
    u.created_at DESC;

-- teachers
SELECT
    t.id,
    t.name,
    t.phone,
    t.info,
    c.title as course,
    to_char(t.created_at, 'DD/MM/YYYY HH:MM:SS') as created_at,
    json_agg(g.title) as groups
FROM
    users t
LEFT JOIN
    courses c
on
    t.course_id = c.id
LEFT JOIN
    groups g
on
    t.id = g.teacher_id
WHERE
    status = 2
group by t.name, t.phone, t.info, c.title, t.created_at, t.id;



UPDATE appeals
SET answered = CASE WHEN answered = TRUE THEN FALSE ELSE TRUE END where id = '9d255b43-0ae1-43de-ba63-a11396e70d04';


INSERT INTO appeals (name, phone, message)
VALUES()




select * from users where course_id = course_id

-- students
select
    u.id, u.name, u.password, u.phone, c.title
from
    users u
left join
    courses c
on
    c.id = u.course_id
where
    u.status = 1;






alter table users add column study_at

INSERT INTO news(title, text, photo)
values('Master class', 'Tajribali dasturchidan master class', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/MasterClass_Logo.jpg');

insert into news (title, text)
values('Yoshlar uchun ajoyib grant loyihasi', 'Tanlovda golib bolgan yoshlar uchun ajoyib grant loyihasi, keling imtihon topshiring va grantni yuting');

    select title from news ORDER by created_at DESC;


update groups set title = 'updated title', teacher_id = '4ffddc32-83b9-4d5a-a651-248ebedb06a8' where id = '2de4b003-0615-475f-8b76-906c36610fb1';

INSERT INTO groups(title, course_id, teacher_id)
VALUES ('n26', '4591c23b-50bc-440a-9795-6aa260c2a6e8', 'da74d59c-7c5e-41ae-bf8a-1206e0c5226f');



-- groups
SELECT
    g.id,
    g.title AS title,
    c.title AS course,
    u.name AS teacher,
    to_char(g.created_at, 'DD/MM/YYYY HH:MM:SS') as created_at
FROM
    groups g
LEFT JOIN
    courses c
ON
    g.course_id = c.id
LEFT JOIN
    users u
ON
    g.teacher_id = u.id;




    -- insert into users(name, password, phone, info, course_id, image, status)
    -- values('ubk', '1', '+998883880118', 'sas', '4591c23b-50bc-440a-9795-6aa260c2a6e8', 'imddjdujdjuj', 3);

    DELETE FROM users WHERE id = 1


UPDATE
    users
SET
    name = 'Sardor Jumayev',
    password = '1',
    phone = '+998814709891',
    info = 'English teachet with 9 score points',
    course_id = '64ae7448-9945-4743-a8e5-9dea878f6651',
    image = 'dkmskmdksmkdm'
where
    id = '4ffddc32-83b9-4d5a-a651-248ebedb06a8';



INSERT INTO courses(title, price) VALUES('Web standart', '800000');
INSERT INTO courses(title, price) VALUES('Android', '900000');
INSERT INTO courses(title, price) VALUES('Smm', '1300000');
INSERT INTO courses(title, price) VALUES('Grafik dizayn', '700000');
-- ------------------------------------------------------------------------------------------------------------------------



INSERT INTO users(name, password, phone, status)
VALUES('ubk', '1q2w3e4r', '+998883880118', 3);


INSERT INTO users(name, password, phone, image)
values('ubk', '1q2w3e4r', 'dd', '')






-- SELECT
--     g.id,
--     g.title,
--     c.title
-- FROM
--     groups g
-- INNER JOIN
--     users u
-- ON
--     g.teacher_id = u.user_id
-- INNER JOIN
--     courses c
-- ON
--     c.id = g.course_id
-- WHERE
--     user_id = 16;


-- groups
SELECT
    g.id AS id,
    g.title AS groups,
    u.user_name AS teacher,
    u.user_phone AS phone,
    c.title AS course,
    c.price AS price
FROM
    groups g
INNER JOIN
    users u
ON
    g.teacher_id = u.user_id
INNER JOIN
    courses c
ON
    g.course_id = c.id
ORDER BY g.title;

---------------------------------------------------------------------------------------------------------------------------------------------

-- -- HOMEWORKS
-- DROP TABLE IF EXISTS homeworks;
-- CREATE TABLE homeworks(
--     id SERIAL NOT NULL PRIMARY KEY,
--     title VARCHAR(64) NOT NULL,
--     content TEXT NOT NULL,
--     group_id INT,
--     FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE CASCADE
-- );



-- INSERT INTO homeworks(title, content, group_id) VALUES('homework1', '1-darsda otilganlarni takrorlab kelish', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO homeworks(title, content, group_id) VALUES('homework2', '2-darsda otilganlarni takrorlab kelish', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO homeworks(title, content, group_id) VALUES('homework3', '3-darsda otilganlarni takrorlab kelish', '940eed8b-182f-46a8-89bb-2a293c69832c');
-- INSERT INTO homeworks(title, content, group_id) VALUES('pgcrypto', 'pgCrypto ni organib kelish crud', 'c5f01fd2-7390-4b86-988b-97ef35cf79dd');
-- INSERT INTO homeworks(title, content, group_id) VALUES('Postgressda CRUD', 'crud hosil qilish', 'c5f01fd2-7390-4b86-988b-97ef35cf79dd');
-- INSERT INTO homeworks(title, content, group_id) VALUES('css', 'Trafalgar maketini bitirb kelish', 'c5f01fd2-7390-4b86-988b-97ef35cf79dd');
-- INSERT INTO homeworks(title, content, group_id) VALUES('homework1', 'takrorlash', 'ae565d89-85ad-48d1-8e04-10775901702a');
----------------------------------------------------------------------------------------------------------------------------------------------------

-- users



-- INSERT INTO users(user_name, user_password, user_phone, user_status)
-- VALUES('ulugbek', 'ulugbek123', '998-88-388-01-18', 3);

-- SELECT
--     u.user_id as id,
--     u.user_name as name,
--     u.user_password as password,
--     u.user_phone as phone,
--     u.user_created_at as created_at,
--     g.title as group
-- FROM
--     users u
-- INNER JOIN
--     student_groups sg
-- ON
--     u.user_id = sg.student_id
-- INNER JOIN
--     groups g
-- ON
--     sg.group_id = g.id
-- WHERE user_status = 1;


-- DROP TABLE IF EXISTS student_groups;
-- CREATE TABLE student_groups(
--     student_group_id SERIAL NOT NULL PRIMARY KEY,
--     student_id INT,
--     group_id INT,
--     FOREIGN KEY(student_id)
--     REFERENCES users(user_id)
--     ON DELETE CASCADE,
--     FOREIGN KEY(group_id)
--     REFERENCES groups(id)
--     on DELETE CASCADE
-- );




-- select
--     u.user_id as id,
--     g.title,
--     g.id as group_id
-- from
--     student_groups sg
-- JOIN
--     users u
-- ON
--     sg.student_id = u.user_id
-- JOIN
--     groups g
-- ON
--     sg.group_id = g.id
-- where
--     u.user_id = 100;




    -- users: id, name, phone, email, password, status, created_at, info, updated_at,
    -- courses: id, title, description, created_at, updated_at, price, info
    -- groups: title, dis


-- SELECT
--     courses.course_id,
--     courses.course_name,
--     json_agg(json_build_object('teacher_id', teachers.teacher_id, 'teacher_name', teachers.teacher_name)) AS teachers
-- FROM
--     courses
-- JOIN
--     course_teacher
-- ON
--     courses.course_id = course_teacher.course_id
-- JOIN
--     teachers
-- ON
--     course_teacher.teacher_id = teachers.teacher_id
-- GROUP BY
--     courses.course_id, courses.course_name;