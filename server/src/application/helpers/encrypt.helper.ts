import bcrypt from "bcrypt";
import crypto from "node:crypto";

async function genHash(password: string): Promise<string> {
  const rounds = crypto.randomInt(10, 50);
  const salt = await bcrypt.genSalt(rounds);
  return bcrypt.hash(password, salt);
}

function compareHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
