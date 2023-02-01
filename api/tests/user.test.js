require("dotenv").config();
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { createApp } = require("../../app");
const { myDataSource } = require("../models/myDataSource");

describe("Sign Up", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await myDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been intialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await myDataSource.destroy();
  });
  test("SUCCESS:PING PONG", async () => {
    await request(app).get("/ping").expect(200).expect("pong");
  });

  test("FAIL : NEED ACCESS TOKEN", async () => {
    await request(app)
      .get("/myShallWe/subscriptions")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .get("/myShallWe/orders")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .get("/myShallWe/refunds")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .get("/myShallWe/reviews")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .get("/myShallWe/userInfo")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .post("/myShallWe/reviews")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .get("/myShallWe/pick")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .patch("/myShallWe/reviews")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
    await request(app)
      .delete("/myShallWe/reviews")
      .expect(401)
      .expect({ message: "Invalid Access Token" });
  });

  test("FAIL: NO userId", async () => {
    const accessToken = await jwt.sign({}, process.env.SECRET_KEY);

    await request(app)
      .get("/myShallWe/subscriptions")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "GETTING SUBSCRIPTIONS ERROR" });
    await request(app)
      .get("/myShallWe/orders")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "GETTING ORDERS ERROR" });
    await request(app)
      .get("/myShallWe/refunds")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "GETTING REFUNDS ERROR" });
    await request(app)
      .get("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "GETTING REVIEWS ERROR" });
    await request(app)
      .get("/myShallWe/userInfo")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "GETTING USERS ERROR" });
    await request(app)
      .post("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "CREATING REVIEWS ERROR" });
    await request(app)
      .get("/myShallWe/pick")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "GETTING PICK ERROR" });
    await request(app)
      .patch("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "UPDATE REVIEWS ERROR" });
    await request(app)
      .delete("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "DELETE REVIEWS ERROR" });
  });

  test("SUCCESS: GET INFORMATIONS ", async () => {
    const accessToken = await jwt.sign({ userId: 1 }, process.env.SECRET_KEY);
    const result1 = await request(app)
      .get("/myShallWe/subscriptions")
      .set({ authorization: accessToken });

    expect(result1.status).toEqual(200);
    expect(result1.body).toHaveProperty("data");

    const result2 = await request(app)
      .get("/myShallWe/orders")
      .set({ authorization: accessToken });

    expect(result2.status).toEqual(200);
    expect(result2.body).toHaveProperty("data");

    const result3 = await request(app)
      .get("/myShallWe/refunds")
      .set({ authorization: accessToken });

    expect(result3.status).toEqual(200);
    expect(result3.body).toHaveProperty("data");

    const result4 = await request(app)
      .get("/myShallWe/reviews")
      .set({ authorization: accessToken });

    expect(result4.status).toEqual(200);
    expect(result4.body).toHaveProperty("orders");

    const result5 = await request(app)
      .get("/myShallWe/userInfo")
      .set({ authorization: accessToken });

    expect(result5.status).toEqual(200);
    expect(result5.body).toHaveProperty("data");

    const result6 = await request(app)
      .get("/myShallWe/pick")
      .set({ authorization: accessToken });

    expect(result6.status).toEqual(200);
    expect(result6.body).toHaveProperty("data");
  });

  test("FAILED REVIEWS", async () => {
    const accessToken = await jwt.sign({ userId: 1 }, process.env.SECRET_KEY);
    await request(app)
      .post("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "CREATING REVIEWS ERROR" });
    await request(app)
      .post("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ movieId: 1 })
      .expect(400)
      .expect({ message: "CREATING REVIEWS ERROR" });
    await request(app)
      .post("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ imagesUrl: [] })
      .expect(400)
      .expect({ message: "CREATING REVIEWS ERROR" });
    await request(app)
      .post("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ imagesUrl: "test" })
      .expect(400)
      .expect({ message: "CREATING REVIEWS ERROR" });
    await request(app)
      .patch("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ imagesUrl: [] })
      .expect(400)
      .expect({ message: "UPDATE REVIEWS ERROR" });
    await request(app)
      .patch("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ reviewId: 1 })
      .expect(400)
      .expect({ message: "UPDATE REVIEWS ERROR" });
    await request(app)
      .delete("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({})
      .expect(400)
      .expect({ message: "DELETE REVIEWS ERROR" });
  });

  test("CREATE & UPDATE & DELETE REVIEWS", async () => {
    const accessToken = await jwt.sign({ userId: 1 }, process.env.SECRET_KEY);

    await request(app)
      .post("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ movieId: 1, content: "test", imagesUrl: ["test"] })
      .expect(201)
      .expect({ message: "Review Created!" });

    const [insertId] = await myDataSource.query(
      "SELECT id from reviews ORDER BY id DESC LIMIT 1;"
    );
    await request(app)
      .patch("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ reviewId: insertId.id, content: "test1", imagesUrl: [] })
      .expect(200)
      .expect({ message: "Updated review" });

    await request(app)
      .delete("/myShallWe/reviews")
      .set({ authorization: accessToken })
      .send({ reviewId: insertId.id })
      .expect(200)
      .expect({ message: "Delete review" });
  });

  test("FAIL:getmyInfo", async () => {
    const accessToken = await jwt.sign(
      { userId: 5000 },
      process.env.SECRET_KEY
    );

    const result = await request(app)
      .get("/myShallWe/userInfo")
      .set({ authorization: accessToken })
      .expect(400)
      .expect({ message: "There are no informations" });
  });
});
