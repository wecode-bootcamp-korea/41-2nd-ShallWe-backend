-- migrate:up
CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  movie_id int NOT NULL,
  content varchar(1000) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_id_forik FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT movie_id_fk FOREIGN KEY (movie_id) REFERENCES movies (id) 
);

-- migrate:down
DROP TABLE reviews;
