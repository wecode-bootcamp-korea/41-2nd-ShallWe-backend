-- migrate:up
CREATE TABLE meeting_times (
  id int NOT NULL AUTO_INCREMENT,
  time date NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE meeting_times;
