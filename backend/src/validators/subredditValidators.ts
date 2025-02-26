import { body } from "express-validator";
import ValidateFieldNotEmpty from "./validateFieldNotEmpty";

const ValidateSubIdNotEmpty = ValidateFieldNotEmpty('sub_id', 'Subreddit Id');
const ValidateSubNameNotEmpty = ValidateFieldNotEmpty('sub_name', 'Subname');

const ValidateCreateSubreddit = [
  body('sub_name')
    .notEmpty().withMessage('Sub name cannot be empty')
    .trim()
    .matches(/^(?!_+$)[a-zA-Z0-9_]+$/).withMessage("only alphabets,letters and underscore allowed")
    .escape(),
  ValidateFieldNotEmpty('display_name', 'Dispaly Name'),
  ValidateFieldNotEmpty('description', 'Description')
]


export {
  ValidateSubIdNotEmpty,
  ValidateSubNameNotEmpty,
  ValidateCreateSubreddit
}

