-- migrate:up
CREATE TABLE refund_status (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(300) NOT NULL,
  PRIMARY KEY (id)
);


-- migrate:down
DROP TABLE refund_status;
