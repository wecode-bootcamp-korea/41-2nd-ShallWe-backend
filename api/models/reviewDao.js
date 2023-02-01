const { myDataSource } = require("./myDataSource");
const check = async (userId, reviewKey) => {
  try {
    const [result] = await myDataSource.query(
      `
      SELECT * FROM reviews WHERE review_key=? AND user_id=?;`,
      [reviewKey, userId]
    );

    return result;
  } catch (error) {
    const err = new Error("check fail");
    err.statusCode = 400;
    throw err;
  }
};

const getReviews = async (userId) => {
  try {
    const result = myDataSource.query(
      `
      SELECT
          r.id,
          m.title,
          m.thumbnail_url,
          r.content,
          r.created_at,
          r.review_key,
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  "id",ri.image_url
                  )
                  ) AS images
      FROM reviews            AS r
      LEFT JOIN review_images AS ri ON ri.review_id=r.id
      LEFT JOIN movies       AS m ON r.movie_id=m.id
      WHERE r.user_id=?
      GROUP BY r.id,m.title,r.content,r.created_at;`,
      [userId]
    );
    return result;
  } catch (error) {
    const err = new Error("get reviews fail");
    err.statusCode = 400;
    throw err;
  }
};

const createReviews = async (
  userId,
  movieId,
  content,
  imagesUrl,
  reviewKey
) => {
  const queryRunner = await myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const review = await queryRunner.query(
      `
       INSERT INTO
       reviews(user_id,movie_id,content,review_key)
       VALUES (?,?,?,?);
       `,
      [userId, movieId, content, reviewKey]
    );

    if (imagesUrl.length) {
      const reviewId = review.insertId;
      let params = imagesUrl.map((x) => `(${reviewId},"${x}")`).join(",");
      await queryRunner.query(
        `
                INSERT INTO
                review_images(review_id,image_url)
                VALUES ${params};
                `
      );
    }

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("GETTING TRANSACTION FAILED ");
    err.statusCode = 400;
    throw err;
  }
};

const updateReviews = async (reviewKey, content, imagesUrl) => {
  const queryRunner = await myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [reviewId] = await queryRunner.query(
      `SELECT id FROM reviews WHERE review_key=?;`,
      [reviewKey]
    );

    await queryRunner.query(
      `
        UPDATE reviews SET content=? WHERE id=?;
       `,
      [content, reviewId.id]
    );

    await queryRunner.query(
      `
        DELETE FROM review_images WHERE review_id=?;
        `,
      [reviewId.id]
    );

    if (imagesUrl.length) {
      let params = imagesUrl.map((x) => `(${reviewId.id},"${x}")`).join(",");

      await queryRunner.query(
        `
                INSERT INTO
                review_images(review_id,image_url)
                VALUES ${params};
                `
      );
    }

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("GETTING TRANSACTION FAILED ");
    err.statusCode = 400;
    throw err;
  }
};

const deleteReviews = async (userId, reviewKey) => {
  const queryRunner = await myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `DELETE FROM reviews WHERE review_key=? AND user_id=?`,
      [reviewKey, userId]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("GETTING TRANSACTION FAILED ");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  check,
  getReviews,
  createReviews,
  updateReviews,
  deleteReviews,
};
