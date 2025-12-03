import { pool } from "../index";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import { newUser,  DBUser, userInfo, userDetails } from "@/types/index";
const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const checkPassword = async (password: string, hashedPasword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPasword);
  return isMatch;
};

export const register = async (newUser: newUser) => {
  const checkEmail = await pool.query("select * from users where email=$1 ", [
    newUser.email,
  ]);

 
  
  if (checkEmail.rows.length > 0) {
     console.log("inwds");
    return { data: null, message: "The Email Is Already Exist" };
    
  } else {
     console.log("inwwwwwds",newUser);
    const result = await pool.query<userDetails>(
      "insert into users (first_name, last_name, email, password) values ($1,$2,$3,$4) returning *",
      [
        newUser.first_name,
        newUser.last_name,
        newUser.email,
        await hashPassword(newUser.password),
      ]
    );
console.log("inwwwwwds",result);
    return { message: "registered successfully", data: result.rows };
  }
};

export const login = async (userInfo: userInfo) => {
  const result = await pool.query<DBUser>(
    "select * from users where users.email= $1",
    [userInfo.email]
  );

  const dbUser = result.rows[0];

  if (result.rows.length === 0) {
    return null;
  } else {
    const isMatch = await checkPassword(
      userInfo.password,
      result.rows[0].password
    );

    if (!isMatch) {
      return null;
    } else {
      const token = jwt.sign(
        {
          user_id: dbUser.id,
          role: dbUser.role,
          name: dbUser.first_name,
        },
        process.env.NEXTAUTH_SECRET as Secret,
        { expiresIn: "30d" }
      );
      return {
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name ?? null,
        email: dbUser.email,
        role: dbUser.role,
        token: token,
      };
    }
  }
};

