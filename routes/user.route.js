import express from "express";
import { prisma } from "../lib/prisma/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userValid from "../validator/user.validator.js";

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

// 계정 생성 API
router.post("/signup", userValid.signupValidation, async (req, res, next) => {
  try {
    let saltRounds = 10;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "회원가입 되었습니다." });
  } catch (err) {
    next(err);
  }
});

//로그인 API
router.post("/signin", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) throw new Error("없는 유저입니다");

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign({ userId: user.userId }, "secretOrPrivateKey", {
      expiresIn: "1d",
    });
    res.setHeader("authorization", "Bearer " + token);

    return res.status(200).json({ message: "로그인 하였습니다." });
  } catch (err) {
    next(err);
  }
});

export default router;
