import { Router } from "express"
import { registerHandler } from "../controllers/auth.controllers";

const authRoutes = Router();

// here prefix is `/auth`
authRoutes.post("/register", registerHandler);

export default authRoutes;