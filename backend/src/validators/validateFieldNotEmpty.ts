import { check } from "express-validator";

const ValidateFieldNotEmpty = (field: string, fieldNameInMsg: string) => {
  return check(field)
    .exists().withMessage(`${fieldNameInMsg} field is required`)
    .trim()
    .notEmpty().withMessage(`${fieldNameInMsg} cannot be empty`)
    .escape();
};

export default ValidateFieldNotEmpty;
