-- migrate:up
CREATE TABLE carts (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  meeting_or_subscription_id int NOT NULL,
  counts int NOT NULL,
  price decimal(10,3) NOT NULL,
  cart_type_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_id_forek FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT meeting_id_fk FOREIGN KEY (meeting_or_subscription_id) REFERENCES meetings (id),
  CONSTRAINT cart_type_fk FOREIGN KEY (cart_type_id) REFERENCES cart_types (id),
  CONSTRAINT subscription_type_fk FOREIGN KEY (meeting_or_subscription_id) REFERENCES subscription_types (id),
  CONSTRAINT user_meeting_subscriptions_type_unique UNIQUE(user_id,meeting_or_subscription_id,cart_type_id);
);


-- migrate:down
DROP TABLE carts;
