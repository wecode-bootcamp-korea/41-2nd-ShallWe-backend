const { myDataSource } = require("./myDataSource");
const getPick = async (userId) => {
  try {
    const result = myDataSource.query(
      `
      SELECT
          c.id,
          c.counts,
          c.price,
          mt.meeting_date,
          mtt.time,
          mp.name,
          mp.address,
          m.title,
          m.thumbnail_url
      FROM carts AS c
      INNER JOIN meetings         AS mt ON c.meeting_id=mt.id
      INNER JOIN movies           AS m ON mt.movie_id=m.id
      INNER JOIN meeting_times    AS mtt ON mt.meeting_time_id=mtt.id
      INNER JOIN meeting_places   AS mp ON mt.meeting_place_id=mp.id
      WHERE c.user_id=?;`,
      [userId]
    );
    return result;
  } catch (error) {
    const err = new Error("get pick fail");
    err.statusCode = 400;
    throw err;
  }
};
module.exports = {
  getPick,
};
