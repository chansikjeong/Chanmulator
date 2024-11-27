import express from "express";
import { prisma } from "../lib/prisma/index.js";

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

//사용자 생성
router.post("/userpost", async (req, res, next) => {
  const { username, password } = req.body;

  const userid = await prisma.User.findFirst({
    where: { username: username },
  });
  if (userid) {
    return res.status(400).json({ errorMessage: "이미 존재하는 ID입니다." });
  }
  if (!username) {
    return res.status(409).json({ errorMessage: "ID를 다시 입력하십시오" });
  }
  console.log("아이디입니디" + username);

  const user = await prisma.User.create({
    //UserInfos 테이블
    data: {
      username,
      password,
    },
  });
  return res.status(201).json({ data: user });
});

export default router;
