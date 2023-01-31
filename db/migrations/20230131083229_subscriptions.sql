-- migrate:up
CREATE TABLE subscriptions (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  subscription_type_id int NOT NULL,
  activation boolean NOT NULL,
  payment_type_id int NOT NULL,
  payment_method_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiration_at datetime NOT NULL ,
  next_pay_at datetime NOT NULL,
  billing_key varchar(300) NOT NULL,
  billing_id varchar(255) NOT NULL,
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_id_fok FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT subscription_type_id_fk FOREIGN KEY (subscription_type_id) REFERENCES subscription_types (id),
  CONSTRAINT payment_type_id_fk FOREIGN KEY (payment_type_id) REFERENCES payment_types (id),
  CONSTRAINT payment_method_id_fk FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id)

);

-- migrate:down
DROP TABLE subscriptions;
