import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

export const subscribeUser = async (req, res) => {
  const { planId } = req.params;

  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ message: "Plan not found" });

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + plan.duration);

  const subscription = await Subscription.create({
    user_id: req.user.id,
    plan_id: planId,
    start_date: startDate,
    end_date: endDate,
    status: "active",
  });

  res.json(subscription);
};

export const getMySubscription = async (req, res) => {
  const sub = await Subscription.findOne({ user_id: req.user.id })
    .populate("plan_id");

  res.json(sub);
};

export const getAllSubscriptions = async (req, res) => {
  const subs = await Subscription.find()
    .populate("user_id")
    .populate("plan_id");

  res.json(subs);
};
