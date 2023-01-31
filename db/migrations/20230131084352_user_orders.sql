-- migrate:up
CREATE TABLE user_orders (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  meeting_id int NOT NULL,
  counts int NOT NULL,
  price decimal(10,3) NOT NULL,
  payment_type_id int NOT NULL,
  payment_method_id int NOT NULL,
  billing_id varchar(255) DEFAULT NULL,
  activation boolean NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_id_foreik FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT meeting_id_fork FOREIGN KEY (meeting_id) REFERENCES meetings (id),
  CONSTRAINT payment_type_id_foreignk FOREIGN KEY (payment_type_id) REFERENCES payment_types (id),
  CONSTRAINT payment_method_id_foreignk FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id)
);

-- migrate:down
DROP TABLE user_orders;
