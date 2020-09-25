import crypto from 'crypto';

import { User } from 'Database/Models';
import { WRONG_EMAIL_PASSWORD } from 'Constants';
import { generateJwt } from 'Core/Jwt';

interface ISignInInput {
  email: string,
  password: string
}

export async function signIn(_: any, { email, password }: ISignInInput) {
  const existedUser = await User.signInWithEmailAndPassword(email.toLowerCase());
  const { hash, salt } = existedUser;
  if (!isEqualPassword(password, hash, salt)) {
    throw new Error(WRONG_EMAIL_PASSWORD);
  }

  const token = generateJwt({
    userId: existedUser._id,
    role: existedUser.role
  });

  return {
    name: existedUser.name,
    email: existedUser.email,
    userName: existedUser.userName,
    role: existedUser.role,
    token
  };
}

function isEqualPassword(password: string, hash: string, salt: string) {
  return hash === crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}