CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    user_id INTEGER
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://www.wilton.com/dw/image/v2/AAWA_PRD/on/demandware.static/-/Sites-wilton-project-master/default/dw773dcbf7/images/project/WLPROJ-9181/BuSuCaHa_44928%202.jpg?sw=800&sh=800');
INSERT INTO dishes (title, image_url) VALUES ('pudding', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/11/Chocolate-sponge_440x400-9711a6e.jpg?quality=90&resize=556,505');

-- INSERT INTO users (email) VALUES ('dt@ga.co');
-- INSERT INTO users (email) VALUES ('student@generalassemb.ly');


