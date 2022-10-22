import { Password } from "@mui/icons-material";
import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid: boolean = await compare(password, hashedPassword);
  return isValid;
};
