-- migrate:up
CREATE TABLE movie_directors (
  id int NOT NULL AUTO_INCREMENT,
  movie_id int NOT NULL,
  director_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT movie_id_fork FOREIGN KEY (movie_id) REFERENCES movies (id),
  CONSTRAINT director_id_fk FOREIGN KEY (director_id) REFERENCES directors (id)
);

-- migrate:down
DROP TABLE movie_directors;
