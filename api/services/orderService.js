const orderDao = require("../models/orderDao");

class orderService {
  type = Object.freeze({
    MONEY: 2,
    CARD: 3,
  });

  constructor() {
    this.orderDao = new orderDao();
  }

  async getOrders(userId) {
    return await this.orderDao.getOrders(userId);
  }

  async completeOrders(tid, paymentType, pickId) {
    return await this.orderDao.completeOrders(
      tid,
      this.type[paymentType],
      pickId
    );
  }

  async completeSubscription(
    userId,
    tid,
    sid,
    paymentType,
    subscriptionTypeId
  ) {
    return await this.orderDao.completeSubscription(
      userId,
      tid,
      sid,
      this.type[paymentType],
      subscriptionTypeId
    );
  }
}

module.exports = orderService;
