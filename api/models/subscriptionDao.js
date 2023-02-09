const { myDataSource } = require("./myDataSource");
const getSubscriptions = async (userId) => {
  try {
    const result = await myDataSource.query(
      `
      SELECT 
          s.id,
          s.subscription_type_id,
          st.name     AS subscription_name,
          st.price    AS subscription_price,
          st.detail   AS subscription_detail,
          s.activation,
          pt.name     AS payment_name,
          s.created_at,
          s.expiration_at,
          s.next_pay_at,
          s.billing_id,
          IF(
              s.activation=FALSE,
              JSON_OBJECT(
                  "created_at",sr.created_at,
                  "price",sr.price,
                  "refund_status",rs.name
                  ),
              null) AS refund 
      FROM        subscriptions       AS s
      INNER JOIN  payment_types       AS pt ON s.payment_type_id=pt.id
      INNER JOIN  subscription_types  AS st ON s.subscription_type_id=st.id
      LEFT JOIN   subscription_refund AS sr ON sr.subscription_id=s.id
      LEFT JOIN   refund_status       AS rs ON sr.refund_status_id=rs.id
      WHERE s.user_id=?;
  `,
      [userId]
    );
    return result;
  } catch (error) {
    const err = new Error("get subscription fail");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  getSubscriptions,
};
