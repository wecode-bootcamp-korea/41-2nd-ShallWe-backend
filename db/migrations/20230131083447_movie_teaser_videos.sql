-- migrate:up
CREATE TABLE movie_teaser_videos (
  id int NOT NULL AUTO_INCREMENT,
  movie_id int NOT NULL,
  video_url varchar(1000) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT movie_id_fok FOREIGN KEY (movie_id) REFERENCES movies (id)
);

-- migrate:down
DROP TABLE movie_teaser_videos;
