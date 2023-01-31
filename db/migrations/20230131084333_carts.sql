-- migrate:up
CREATE TABLE carts (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  meeting_id int NOT NULL,
  counts int NOT NULL,
  price decimal(10,3) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_id_forek FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT meeting_id_fk FOREIGN KEY (meeting_id) REFERENCES meetings (id)
);


-- migrate:down
DROP TABLE carts;
