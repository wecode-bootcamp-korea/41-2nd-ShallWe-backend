-- migrate:up
CREATE TABLE payment_methods (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE payment_methods;
