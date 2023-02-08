const pickService = require("../services/pickService");
const { asyncErrorHandler, customError } = require("../middlewares/error");

const getPick = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throw customError("GETTING PICK ERROR", 400);
  const results = await pickService.getPick(userId);

  return response.status(200).json({ data: results });
});

const postPick = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { id, counts, price } = request.body;

  if (!userId || !id || !counts || !price)
    throwCustomError("POSTING PICK ERROR", 400);

  await pickService.postPick(userId, id, counts, price);

  return response.status(201).json({ message: "PICK POSTED" });
});

const updatePick = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { id, counts, price } = request.body;

  if (!userId || !id || !counts || !price)
    throwCustomError("UPDATE PICK ERROR", 400);

  await pickService.updatePick(userId, id, counts, price);

  return response.status(200).json({ message: "PICK UPDATED" });
});

const deletePick = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const id = request.params.id;

  if (!userId || !id) throwCustomError("DELETE PICK ERROR", 400);

  await pickService.deletePick(userId, id);

  return response.status(200).json({ message: "DELETE PICK" });
});

module.exports = {
  getPick,
  postPick,
  updatePick,
  deletePick,
};
