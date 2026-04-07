import * as bcrypt from 'bcrypt';

export async function hashString(string: string) {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(string, salt);
  return hashed;
}

export async function compareStringAndHash(string: string, hash: string) {
  const result = await bcrypt.compare(string, hash);
  return result;
}
