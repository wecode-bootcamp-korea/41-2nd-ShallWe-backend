-- migrate:up
CREATE TABLE subscription_types (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  price decimal(10,3) NOT NULL,
  detail varchar(1000) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE subscription_types;
