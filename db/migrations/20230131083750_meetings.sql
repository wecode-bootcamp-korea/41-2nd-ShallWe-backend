-- migrate:up
CREATE TABLE meetings (
  id int NOT NULL AUTO_INCREMENT,
  movie_id int NOT NULL,
  capacity int NOT NULL,
  counts  int NOT NULL,
  meeting_date date NOT NULL,
  meeting_time_id int NOT NULL,
  meeting_place_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT movie_id_foreik FOREIGN KEY (movie_id) REFERENCES movies (id),
  CONSTRAINT meeting_time_id_fk FOREIGN KEY (meeting_time_id) REFERENCES meeting_times(id),
  CONSTRAINT meeting_place_id_fk FOREIGN KEY (meeting_place_id) REFERENCES meeting_places (id) 
);

-- migrate:down
DROP TABLE meetings;
