const { myDataSource } = require("./myDataSource");

const movieDetails = async (movieId) => {
  try {
    const result = await myDataSource.query(
      `
	SELECT 
	  m.id,
	  m.title,
	  m.thumbnail_url,
	  m.release_date,
	  mg.name AS movie_genre,
	  m.running_time,
	  m.plot,
	  m.price,
	  JSON_ARRAYAGG(
		  mtv.video_url
	  ) AS movie_teaser,
	  mh.hashtag,
	  ma.actors,
	  md.directors,
	  r.reviews,
	  mt.meetings
  	FROM movies AS m
  	INNER JOIN
	  movie_genres AS mg 
  	ON m.movie_genre_id=mg.id
  	LEFT JOIN 
	  movie_teaser_videos AS mtv 	
  	ON mtv.movie_id=m.id
  	LEFT JOIN (
	  SELECT 
		  mh.movie_id,
		  JSON_ARRAYAGG(mh.content) AS hashtag
	  FROM movie_hashtags AS mh 
	  INNER JOIN 
		  movies AS m 
	  ON m.id=mh.movie_id
	  GROUP BY mh.movie_id
 	 ) AS mh 
  	ON mh.movie_id=m.id
  	LEFT JOIN(
	  SELECT
		  ma.movie_id,
		  JSON_ARRAYAGG(a.name) AS actors
	  FROM movie_actors AS ma
	  INNER JOIN 
		  actors AS a 
	  ON ma.actor_id=a.id
	  GROUP BY ma.movie_id
  	)AS ma
  	ON ma.movie_id=m.id
  	LEFT JOIN(
	  SELECT
		  md.movie_id,
		  JSON_ARRAYAGG(d.name) AS directors
	  FROM movie_directors AS md
	  INNER JOIN 
		  directors AS d 
	  ON md.director_id=d.id
	  GROUP BY md.movie_id
  	)AS md
  	ON md.movie_id=m.id
  	LEFT JOIN(
	  SELECT
		  r.movie_id,
		  JSON_ARRAYAGG(
			  JSON_OBJECT(
				  "reveiw_id",r.id,
				  "nickname", u.nickname,
				  "profile_image", u.profile_image,
				  "review_content",r.content,
				  "created_at",r.created_at,
				  "images",ri.images
			  )
		  ) AS reviews
	  FROM reviews AS r
	  INNER JOIN 
		  users AS u 
	  ON r.user_id=u.id
	  LEFT JOIN(
		  SELECT
			  ri.review_id,
			  JSON_ARRAYAGG(ri.image_url) AS images
		  FROM review_images AS ri 
		  INNER JOIN 
			  reviews AS r 
		  ON r.id=ri.review_id
		  GROUP BY ri.review_id
	  )AS ri 
	  ON ri.review_id=r.id
	  GROUP BY r.movie_id
  	)
  	AS r 
  	ON r.movie_id=m.id
  	LEFT JOIN(
	  SELECT
		  mt.movie_id,
		  JSON_ARRAYAGG(
			  JSON_OBJECT(
				  "meeting_id",mt.id,
				  "capacity",mt.capacity,
				  "counts",mt.counts,
				  "date",mt.meeting_date,
				  "time",mtt.time,
				  "place_name",mp.name,
				  "address",mp.address,
				  "latitude",mp.latitude,
				  "longitude",mp.longitude
			  )
		  ) AS meetings
	  FROM meetings AS mt
	  INNER JOIN 
		  meeting_times AS mtt 
	  ON mt.meeting_time_id=mtt.id
	  INNER JOIN 
		  meeting_places AS mp 
	  ON mt.meeting_place_id=mp.id
	  GROUP BY mt.movie_id
  	)AS mt 
  	ON mt.movie_id=m.id
  	WHERE m.id=?
  	GROUP BY m.id;
      `,
      [movieId]
    );
    return result;
  } catch (err) {
    const error = new Error("Getting details error");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  movieDetails,
};
