const { myDataSource } = require("./myDataSource");

const getOrders = async (userId) => {
  try {
    const result = await myDataSource.query(
      `
      SELECT
          uo.id AS order_id,
          uo.counts,
          uo.price,
          pt.name as payment_type,
          JSON_OBJECT(
              "movie_id",m.id,
              "movie_title",m.title,
              "plot",m.plot,
              "thumbnail_url",m.thumbnail_url,
              "date",mt.meeting_date,
              "time",mtt.time,
              "place_name",mp.name,
              "place_address",mp.address
              ) AS movies,
		  JSON_ARRAYAGG(
          JSON_OBJECT(
          "review_id",r.id,
          "review",r.content,
          "created_at",r.created_at,
          "images",sr.images
          ) 
          )AS reviews
      FROM user_orders            AS uo
      INNER JOIN payment_types    AS pt ON uo.payment_type_id=pt.id
      INNER JOIN meetings         AS mt ON uo.meeting_id=mt.id
      INNER JOIN movies           AS m ON mt.movie_id=m.id
      INNER JOIN meeting_times    AS mtt ON mt.meeting_time_id=mtt.id
      INNER JOIN meeting_places   AS mp ON mt.meeting_place_id=mp.id
      INNER JOIN reviews		  AS r  ON r.user_id=uo.user_id
      LEFT JOIN(
      SELECT
		    r.id ,
		    JSON_ARRAYAGG(
              JSON_OBJECT(
                  "id",ri.image_url
                  )
                  ) AS images
      FROM reviews            AS r
      LEFT JOIN review_images AS ri ON ri.review_id=r.id
      GROUP BY r.id,r.movie_id)AS sr ON sr.id=r.id
      WHERE uo.activation=TRUE AND uo.user_id=?
      GROUP BY uo.id,uo.counts,uo.price,pt.name,movies;
      `,
      [userId]
    );
    return result;
  } catch (error) {
    const err = new Error("get orders fail");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  getOrders,
};
