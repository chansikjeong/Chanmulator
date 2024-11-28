import express from "express";
import { prisma } from "../lib/prisma/index.js";

const router = express.Router();

// 아이템 생성 api
router.post("/item", async (req, res, next) => {
  try {
    const { itemCode, itemName, itemStat, itemPrice } = req.body;
    const item = await prisma.item.create({
      data: { itemCode, itemName, itemStat, itemPrice },
    });

    return res
      .status(201)
      .json({ message: `성공적으로 아이템을 생성하였습니다. : ${itemName}` });
  } catch (err) {
    next(err);
  }
});

export default router;
