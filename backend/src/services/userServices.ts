import bcrypt from "bcrypt";
import { query, queryTransaction } from "../db";
import CustomError from "../utils/customError";

interface userCredentialsParams {
  username: string;
  password: string;
}

const checkUserExist = async(username: string) => {
  const existQuery = await query(`SELECT EXISTS (SELECT 1 FROM users 
    WHERE username = $1 LIMIT 1)`, [username] 
  );
  return existQuery.rows[0].exists;
}

const createUser = async({ username, password }: userCredentialsParams) => {
  const userExist = await checkUserExist(username);
  if (userExist) {
    throw new CustomError("User registration failed", 403, {
      errors: "User already exist",
      location: "userController/postRegister/createUser"
    })
  }
  //add user to db
  const hashedPassword = await bcrypt.hash(password, 10);
  await query("INSERT INTO users (username, password_hash) VALUES ($1, $2)",
  [username, hashedPassword]);
}

export {
  createUser
}
