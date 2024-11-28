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

// 아이템 수정 api
router.patch("/item/:itemCode", async (req, res, next) => {
  try {
    //req 정보 받기
    const itemCode = req.params.itemCode;
    const { itemName, itemStat } = req.body;
    //테이블의 정보 수정
    await prisma.item.update({
      where: {
        itemCode: Number(itemCode),
      },
      data: {
        itemName: itemName,
        itemStat: itemStat,
      },
    });

    return res
      .status(200)
      .json({ message: "아이템이 성공적으로 수정되었습니다." });
  } catch (err) {
    next(err);
  }
});

//아이템 조회 api

export default router;
