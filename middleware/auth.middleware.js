import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma/index.js";

export default async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("토큰이 존재하지 않습니다.");

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer")
      throw new Error("토큰 타입이 일치하지 않습니다.");

    const decodedToken = jwt.verify(token, "secretOrPrivateKey");
    const userId = decodedToken.userId;

    const user = await prisma.user.findFirst({
      where: { userId: +userId }, //+는 숫자형으로 주기 위해서
    });
    if (!user) {
      throw new Error("토큰 사용자가 존재하지 않습니다.");
    }

    // 사용자 정보를 저장
    req.body.user = user; //body에서 읽을 거라 body라고 지정해주기

    next();
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        return res.status(401).json({ message: "토큰이 만료되었습니다." });
      case "JsonWebTokenError":
        return res.status(401).json({ message: "토큰이 조작되었습니다." });
      default:
        return res.status(401).json({
          message: error.message ?? "비정상적인 요청입니다.",
        });
    }
  }
}
