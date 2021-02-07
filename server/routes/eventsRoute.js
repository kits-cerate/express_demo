const express = require("express");
const router = express.Router();

const eventsRoutes = require("./../controllers/eventsController.js");

router.get("/all", eventsRoutes.getAll);

router.post("/create", eventsRoutes.insert);

router.post("/delete", eventsRoutes.delete);

router.post("/update", eventsRoutes.update);

module.exports = router;
