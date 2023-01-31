-- migrate:up
CREATE TABLE user_addresses (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  address varchar(1000) NOT NULL,
  zip_code varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE user_addresses;
