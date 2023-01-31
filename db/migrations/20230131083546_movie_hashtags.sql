-- migrate:up
CREATE TABLE movie_hashtags (
  id int NOT NULL AUTO_INCREMENT,
  movie_id int NOT NULL,
  content varchar(300) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT movie_id_forigk FOREIGN KEY (movie_id) REFERENCES movies (id)
);


-- migrate:down
DROP TABLE movie_hashtags;
