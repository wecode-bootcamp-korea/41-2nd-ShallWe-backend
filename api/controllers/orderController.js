require("dotenv").config();
const orderService = require("../services/orderService");
const axios = require("axios");
const { asyncErrorHandler, throwCustomError } = require("../middlewares/error");

let tid;
let userId;
let pickId;
let name;
let totalPrice;

const getOrders = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) return throwCustomError("GETTING ORDERS ERROR", 400);
  const results = await orderService.getOrders(userId);
  return response.status(200).json({ data: results });
});

const pickPostOrders = asyncErrorHandler(async (request, response) => {
  userId = request.userId;
  pickId = request.body.pickId;
  name = request.body.name;
  totalPrice = request.body.totalPrice;

  if (!userId || !pickId.length || !name || !totalPrice)
    return throwCustomError("POSTING ORDERS ERROR", 400);

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
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: `${name} 등 ${pickId.length}건`,
        quantity: 1,
        total_amount: `${totalPrice}`,
        vat_amount: 0,
        tax_free_amount: 0,
        approval_url: "http://localhost:3000/myShallWe/orders/pick",
        fail_url: "http://localhost:3000/myShallWe/fail",
        cancel_url: "http://localhost:3000/myShallWe/cancel",
      },
    }
  );

  tid = kakaoPay.data.tid;

  return response.status(200).json({ url: kakaoPay.data.next_redirect_pc_url });
});

const pickGetOrders = asyncErrorHandler(async (request, response) => {
  const pg_token = request.query.pg_token;

  const kakaoPay = await axios.post(
    "https://kapi.kakao.com//v1/payment/approve",
    {},
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN}`,
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        tid: `${tid}`,
        pg_token: `${pg_token}`,
      },
    }
  );

  if (kakaoPay.status == 200) {
    const result = await orderService.completeOrders(
      userId,
      kakaoPay.data.tid,
      kakaoPay.data.payment_method_type,
      pickId
    );
    return response.redirect("http://localhost:3000/approval");
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
  pickGetOrders,
  pickPostOrders,
  fail,
  cancel,
};
