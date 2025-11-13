import express from "express";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";
import {
  subscribeUser,
  getMySubscription,
  getAllSubscriptions
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/subscribe/:planId", auth, subscribeUser);
router.get("/my-subscription", auth, getMySubscription);
router.get("/admin/subscriptions", auth, adminOnly, getAllSubscriptions);

export default router;
