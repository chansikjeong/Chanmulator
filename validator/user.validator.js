import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().alphanum().lowercase().min(4).max(12).required(),
  password: Joi.string().min(6).max(20).required(),
  passwordCheck: Joi.string().valid(Joi.ref("password")).required(),
});

const userValidator = {
  signupValidation: async (req, res, next) => {
    const validation = signupSchema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({ message: "잘못된 입력입니다." });
    }

    next();
  },
};

export default userValidator;
