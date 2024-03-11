import express from "express";
import MovieController from "./controller";
import ValidationHelper from "../../validation/validation.helper";
import validationHelper from "../../validation/validation.helper";

const router = express.Router();

router.post("/", ValidationHelper.addMovie, MovieController.addMovie);
router.get("/", MovieController.getAll);
router.get("/search", MovieController.search);
router.put("/:id", validationHelper.updateMovie, MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);
export default router;
