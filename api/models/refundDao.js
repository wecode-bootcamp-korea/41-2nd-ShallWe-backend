const { myDataSource } = require("./myDataSource");

const getRefunds = async (userId) => {
  try {
    const result = myDataSource.query(
      `
      SELECT
          uor.id,
          rs.name         AS refund_status,
          uor.created_at,
          uo.counts,
          uo.price,
          pt.name         AS payment_type,
          uo.billing_id,
          JSON_OBJECT(
              "movie_title",m.title,
              "thumbnail_url",m.thumbnail_url,
              "date",mt.meeting_date,
              "time",mtt.time,
              "place_name",mp.name,
              "place_address",mp.address
              ) AS movies
      FROM user_order_refund      AS uor
      INNER JOIN refund_status    AS rs ON uor.refund_status_id=rs.id
      INNER JOIN user_orders      AS uo ON uor.user_order_id=uo.id
      INNER JOIN payment_types    AS pt ON uo.payment_type_id=pt.id
      INNER JOIN meetings         AS mt ON uo.meeting_id=mt.id
      INNER JOIN movies           AS m ON mt.movie_id=m.id
      INNER JOIN meeting_times    AS mtt ON mt.meeting_time_id=mtt.id
      INNER JOIN meeting_places   AS mp ON mt.meeting_place_id=mp.id
      WHERE uo.activation=FALSE AND uor.user_id=?;
      `,
      [userId]
    );
    return result;
  } catch (error) {
    const err = new Error("get refunds fail");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { getRefunds };
