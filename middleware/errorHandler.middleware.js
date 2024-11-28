export default function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(400).json({ errorMessage: err.message });
  } else if (err.code === "P2002") {
    return res.status(409).json({ message: "중복된 아이디입니다." });
  }

  return res
    .status(500)
    .json({ errorMessage: "서버에서 에러가 발생하였습니다." });
}
