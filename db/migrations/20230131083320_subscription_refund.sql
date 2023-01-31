-- migrate:up
CREATE TABLE subscription_refund (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  subscription_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  price decimal(10,3) NOT NULL,
  refund_status_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT user_id_fork FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT subscription_id_fk FOREIGN KEY (subscription_id) REFERENCES subscriptions (id),
  CONSTRAINT refund_status_id_fk FOREIGN KEY (refund_status_id) REFERENCES refund_status (id)
);

-- migrate:down
DROP TABLE subscription_refund;
