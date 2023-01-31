-- migrate:up
CREATE TABLE meeting_places (
  id int NOT NULL AUTO_INCREMENT,
  movie_id int NOT NULL,
  name varchar(300) NOT NULL,
  address varchar(1000) NOT NULL,
  latitude decimal(10,7) NOT NULL,
  longitude decimal(10,7) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT movie_id_forek FOREIGN KEY (movie_id) REFERENCES movies (id) 
);

-- migrate:down
DROP TABLE meeting_places;
