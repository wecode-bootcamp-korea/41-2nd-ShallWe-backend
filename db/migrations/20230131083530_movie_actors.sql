-- migrate:up
CREATE TABLE movie_actors (
  id int NOT NULL AUTO_INCREMENT,
  movie_id int NOT NULL,
  actor_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT movie_id_forik FOREIGN KEY (movie_id) REFERENCES movies (id),
  CONSTRAINT actor_id_fk FOREIGN KEY (actor_id) REFERENCES actors (id)
);

-- migrate:down
DROP TABLE movie_actors;
