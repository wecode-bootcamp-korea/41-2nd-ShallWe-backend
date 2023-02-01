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

const postPick = async (userId, id, counts, price) => {
  return await myDataSource.query(
    `
  INSERT INTO carts
  (user_id,meeting_id,counts,price)
  VALUES (?,?,?,?)
  ON DUPLICATE KEY UPDATE
  counts=?,price=?;`,
    [userId, id, counts, price, counts, price]
  );
};

const checkPick = async (userId, id) => {
  const result = myDataSource.query(
    `
    SELECT 
      *
    FROM carts AS c
    WHERE c.user_id =? AND c.id=?;`,
    [userId, id]
  );
  return result;
};

const updatePick = async (userId, id, counts, price) => {
  return await myDataSource.query(
    `
    UPDATE
      carts
    SET
    counts=?, price=? 
    WHERE user_id=? AND id=?;`,
    [counts, price, userId, id]
  );
};

const deletePick = async (userId, id) => {
  return await myDataSource.query(
    `
    DELETE FROM carts
    WHERE user_id=? AND id=?;`,
    [userId, id]
  );
};

module.exports = {
  getPick,
  postPick,
  checkPick,
  updatePick,
  deletePick,
};
