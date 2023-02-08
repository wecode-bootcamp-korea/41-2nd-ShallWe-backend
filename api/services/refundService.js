const { customError } = require("../middlewares/error");
const refundDao = require("../models/refundDao");
const axios = require("axios");

const getRefunds = async (userId) => {
  return await refundDao.getRefunds(userId);
};

const cancelSubscription = async (userId, subscriptionId) => {
  const [check] = await refundDao.check(subscriptionId);
  if (!check) throw customError("Cannot cancel subscription", 400);

  const kakaoPay = await axios.post(
    "https://kapi.kakao.com/v1/payment/manage/subscription/inactive",
    {},
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TCSUBSCRIP",
        sid: check.billing_key,
      },
    }
  );

  if (kakaoPay.status != 200) {
    throw customError("Cannot cancel subscription", 400);
  }
  return await refundDao.cancelSubscription(
    userId,
    subscriptionId,
    check.expiration_at
  );
};

module.exports = {
  getRefunds,
  cancelSubscription,
};
