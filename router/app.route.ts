import { Router } from "express";
import login from "../controllers/auth/login";
import signup from "../controllers/auth/signup";
import { greeting } from "../controllers/greeting";
import authMiddelWare from "../middlewares/auth";

const router = Router();

router.get("/", greeting);

router.post("/signup", signup);
router.post("/login", login);

router.use(authMiddelWare);

export default router;
