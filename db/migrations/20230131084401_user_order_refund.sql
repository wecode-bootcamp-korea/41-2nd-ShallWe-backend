-- migrate:up
CREATE TABLE user_order_refund (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  refund_status_id int NOT NULL,
  user_order_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_id_foreignkey FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT refund_status_id_fok FOREIGN KEY (refund_status_id) REFERENCES refund_status (id),
  CONSTRAINT user_order_id_fk FOREIGN KEY (user_order_id) REFERENCES user_orders (id)
);

-- migrate:down
DROP TABLE user_order_refund;

