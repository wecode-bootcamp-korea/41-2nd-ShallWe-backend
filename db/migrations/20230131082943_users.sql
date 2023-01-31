-- migrate:up
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  nickname varchar(200) NOT NULL,
  email varchar(200) NOT NULL,
  password varchar(255) DEFAULT NULL,
  profile_image varchar(1000) DEFAULT NULL,
  social_type_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT social_type_id_fk FOREIGN KEY (social_type_id) REFERENCES social_types (id)
);

-- migrate:down
DROP TABLE users;