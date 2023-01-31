-- migrate:up
CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(300) NOT NULL,
  thumbnail_url varchar(1000) NOT NULL,
  release_date date NOT NULL,
  movie_genre_id int NOT NULL,
  running_time time NOT NULL,
  plot varchar(1000) NOT NULL,
  price decimal(10,3) NOT NULL, 
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT movie_genre_id_fk FOREIGN KEY (movie_genre_id) REFERENCES movie_genres (id)
);

-- migrate:down
DROP TABLE movies;
