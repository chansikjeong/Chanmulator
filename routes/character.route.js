import express from "express";
import { prisma } from "../lib/prisma/index.js";
import { Prisma } from "@prisma/client";
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

    return res.status(201).json({ characterId: character.characterId });
  } catch (err) {
    next(err);
  }
});

// 캐릭터 삭제 api

router.delete("/delCharacter/:characterId", auth, async (req, res, next) => {
  try {
    const { characterId } = req.params;

    const character = await prisma.character.findFirst({
      where: { characterId: Number(characterId) },
    });

    await prisma.character.delete({
      where: { characterId: +character.characterId },
    });

    return res
      .status(200)
      .json({ message: `성공적으로 ${characterId}번 캐릭터를 삭제했습니다.` });
  } catch (err) {
    next(err);
  }
});

// 다른 유저의 캐릭터 조회 api
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

export default router;
