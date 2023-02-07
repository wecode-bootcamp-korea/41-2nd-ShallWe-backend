const cron = require("node-cron");
const orderDao = require("../models/orderDao");
const axios = require("axios");

const subscription = async () => {
  try {
    const task = cron.schedule("0 10 * * *", async () => {
      const subscriptionType = Object.freeze({
        2: "A",
        3: "B",
      });

      const subscriptionPrice = Object.freeze({
        2: 15000,
        3: 25000,
      });

      const check = await orderDao.check();

      check.forEach(async (obj) => {
        const kakaoPay = await axios.post(
          "https://kapi.kakao.com/v1/payment/subscription",
          {},
          {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_ADMIN}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params: {
              cid: "TCSUBSCRIP",
              sid: obj.billing_key,
              partner_order_id: `${process.env.PARTNER_ORDER_ID}`,
              partner_user_id: `${process.env.PARTNER_USER_ID}`,
              item_name: `${subscriptionType[obj.subscription_type_id]}`,
              quantity: 1,
              total_amount: `${subscriptionPrice[obj.subscription_type_id]}`,
              tax_free_amount: 0,
            },
          }
        );

        if (kakaoPay.status == 200) {
          await orderDao.updateSubscription(obj.id, kakaoPay.data.tid);
        }
      });
    });
    task.start();
  } catch (err) {
    task.stop();
    const error = new Error("TASK ERROR");
    error.statusCode = 400;
    throw error;
  }
};
module.exports = subscription;
