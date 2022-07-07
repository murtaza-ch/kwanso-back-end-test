import express from "express";
import user from "../controllers/user";
import task from "../controllers/task";
import validateRequest from "../middleware/validateRequest";
import { isAuth } from "../middleware/auth";
import { registerUserSchema, loginrUserSchema } from "../schema/user";
import { taskSchema } from "../schema/task";

const router = express.Router();

/** User Riutes */
router.post("/register", validateRequest(registerUserSchema), user.register);

router.post("/login", validateRequest(loginrUserSchema), user.login);
router.get("/", isAuth, user.getUser);

/** Task Routes */
router.post("/create", isAuth, validateRequest(taskSchema), task.create);
router.get("/list", isAuth, task.list);
router.post("/delete", isAuth, task.deleteMany);

export = router;
