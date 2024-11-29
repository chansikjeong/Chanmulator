import express from "express";
import { prisma } from "../lib/prisma/index.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// 캐릭터 생성 api
router.post("/creatCharacter", auth, async (req, res, next) => {
  try {
    const { characterName, user } = req.body;
    const character = await prisma.character.create({
      data: {
        characterName: characterName,
        userId: user.userId,
      },
    });

    return res
      .status(201)
      .json({ characterId: `${character.characterId} 번째 캐릭터 생성완료!` });
  } catch (err) {
    next(err);
  }
});

// 캐릭터 삭제 api

router.delete("/delCharacter/:characterId", auth, async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const { user } = req.body;
    const character = await prisma.character.findFirst({
      where: { characterId: +characterId },
    });
    if (+character.userId === +user.userId) {
      await prisma.character.delete({
        where: { characterId: +character.characterId },
      });
      return res.status(200).json({
        message: `성공적으로 ${characterId}번 캐릭터를 삭제했습니다.`,
      });
    } else {
      return next(err);
    }
  } catch (err) {
    next(err);
  }
});

// 전체 캐릭터 조회 API
router.get("/getCharacter", async (req, res, next) => {
  const character = await prisma.character.findMany({
    select: {
      characterName: true,
      health: true,
      power: true,
    },
  });

  return res.status(200).json({ data: character });
});

// 로그인 조회 API
router.get("/getCharacter/:characterId", auth, async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const character = await prisma.character.findFirst({
      where: { characterId: +characterId },
      select: {
        userId: true,
        characterName: true,
        health: true,
        power: true,
        money: true,
      },
    });

    // if (character.userId != user.userId) {
    //   character.userId = false;
    //   character.money = false;
    // }

    return res.status(200).json({ data: character });
  } catch (err) {
    next(err);
  }
});

export default router;
