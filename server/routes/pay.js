import express from "express";
const router = express.Router();

router.post("/create", (req, res) => {
  const { product = "report", name = "" } = req.body || {};
  const priceMap = { report: 2880, more: 5800 };
  res.json({
    ok: true,
    orderId: "ORD" + Date.now(),
    product,
    name,
    amount: priceMap[product] || 2880,
    payUrl: "/mock-pay/" + Date.now(),
    note: "此为模拟支付，接入微信/支付宝/Stripe即可真正收费"
  });
});

export default router;
