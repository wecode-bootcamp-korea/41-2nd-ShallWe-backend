-- migrate:up
CREATE TABLE social_types (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down

DROP TABLE social_types;