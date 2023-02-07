const orderService = require("../services/orderService");
const { asyncErrorHandler, customError } = require("../middlewares/error");
const axios = require("axios");

let tid;
let userId;
let pickId;
let name;
let totalPrice;
let subscriptionTypeId;

const getOrders = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throw customError("GETTING ORDERS ERROR", 400);
  const results = await orderService.getOrders(userId);

  return response.status(200).json({ data: results });
});
const pickPostOrders = asyncErrorHandler(async (request, response) => {
  userId = request.userId;
  pickId = request.body.pickId;
  name = request.body.name;
  totalPrice = request.body.totalPrice;

  if (!userId || !pickId.length || !name || !totalPrice)
    throw customError("POSTING ORDERS ERROR", 400);

  const kakaoPay = await axios.post(
    "https://kapi.kakao.com/v1/payment/ready",
    {},
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: `${process.env.PARTNER_ORDER_ID}`,
        partner_user_id: `${process.env.PARTNER_USER_ID}`,
        item_name: `${name} 등 ${pickId.length}건`,
        quantity: pickId.length,
        total_amount: `${totalPrice}`,
        vat_amount: Math.round((totalPrice * 10) / 110),
        tax_free_amount: 0,
        approval_url: `${process.env.APPROVAL_PICK_URL}`,
        fail_url: `${process.env.FAIL_URL}`,
        cancel_url: `${process.env.CANCEL_URL}`,
      },
    }
  );

  tid = kakaoPay.data.tid;

  return response.status(200).json({ url: kakaoPay.data.next_redirect_pc_url });
});

const pickGetOrders = asyncErrorHandler(async (request, response) => {
  const pg_token = request.query.pg_token;

  const kakaoPay = await axios.post(
    "https://kapi.kakao.com/v1/payment/approve",
    {},
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN}`,
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: `${process.env.PARTNER_ORDER_ID}`,
        partner_user_id: `${process.env.PARTNER_USER_ID}`,
        tid: `${tid}`,
        pg_token: `${pg_token}`,
      },
    }
  );

  if (kakaoPay.status == 200) {
    const result = await orderService.completeOrders(
      kakaoPay.data.tid,
      kakaoPay.data.payment_method_type,
      pickId
    );
    return response.status(200).json({ message: "COMPLETE ORDERS" });
  }

  return response.status(400).json({ message: "approval failure!" });
});

const subscriptionPostOrders = asyncErrorHandler(async (request, response) => {
  userId = request.userId;
  subscriptionTypeId = request.body.subscriptionTypeId;

  const subscriptionType = Object.freeze({
    2: "A",
    3: "B",
  });

  const subscriptionPrice = Object.freeze({
    2: 15000,
    3: 25000,
  });

  if (
    !userId ||
    !subscriptionType[subscriptionTypeId] ||
    !subscriptionPrice[subscriptionTypeId]
  )
    throw customError("SUBSCRIPTION ORDERS ERROR", 400);

  const kakaoPay = await axios.post(
    "https://kapi.kakao.com/v1/payment/ready",
    {},
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TCSUBSCRIP",
        partner_order_id: `${process.env.PARTNER_ORDER_ID}`,
        partner_user_id: `${process.env.PARTNER_USER_ID}`,
        item_name: `${subscriptionType[subscriptionTypeId]}`,
        quantity: 1,
        total_amount: `${subscriptionPrice[subscriptionTypeId]}`,
        vat_amount: Math.round(
          (subscriptionPrice[subscriptionTypeId] * 10) / 110
        ),
        tax_free_amount: 0,
        approval_url: `${process.env.APPROVAL_SUBSCRIPTION_URL}`,
        fail_url: `${process.env.FAIL_URL}`,
        cancel_url: `${process.env.CANCEL_URL}`,
      },
    }
  );

  tid = kakaoPay.data.tid;

  return response.status(200).json({ url: kakaoPay.data.next_redirect_pc_url });
});

const subscriptionGetOrders = asyncErrorHandler(async (request, response) => {
  const pg_token = request.query.pg_token;

  const kakaoPay = await axios.post(
    "https://kapi.kakao.com/v1/payment/approve",
    {},
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN}`,
      },
      params: {
        cid: "TCSUBSCRIP",
        partner_order_id: `${process.env.PARTNER_ORDER_ID}`,
        partner_user_id: `${process.env.PARTNER_USER_ID}`,
        tid: `${tid}`,
        pg_token: `${pg_token}`,
      },
    }
  );

  if (kakaoPay.status == 200) {
    await orderService.completeSubscription(
      userId,
      kakaoPay.data.tid,
      kakaoPay.data.sid,
      kakaoPay.data.payment_method_type,
      subscriptionTypeId
    );
    return response.status(200).json({ message: "COMPLETE SUBCRIPTION" });
  }

  return response.status(400).json({ message: "approval failure!" });
});

const fail = asyncErrorHandler(async (request, response) => {
  return response.status(400).json({ message: "approval failure!" });
});

const cancel = asyncErrorHandler(async (request, response) => {
  return response.status(200).json({ message: "orders cancelled!" });
});

module.exports = {
  getOrders,
  pickPostOrders,
  pickGetOrders,
  subscriptionPostOrders,
  subscriptionGetOrders,
  fail,
  cancel,
};
