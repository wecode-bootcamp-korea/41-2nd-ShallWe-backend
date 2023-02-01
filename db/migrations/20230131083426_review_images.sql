-- migrate:up
CREATE TABLE review_images (
  id int NOT NULL AUTO_INCREMENT,
  review_id int NOT NULL,
  image_url varchar(1000) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT review_id_fk FOREIGN KEY (review_id) REFERENCES reviews (id) ON DELETE CASCADE
);


-- migrate:down
DROP TABLE review_images;