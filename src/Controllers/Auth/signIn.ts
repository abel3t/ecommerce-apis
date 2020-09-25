import crypto from 'crypto';

import { IUser } from '../../Database/Interfaces';
import { User } from 'Database/Models';
import { WRONG_EMAIL_PASSWORD } from 'Core/Constant/clientError';

interface ISignInInput {
  email: string,
  password: string
}

export async function signIn(_: any, { email, password }: ISignInInput) {
  const existedUser = <IUser>await User.signInWithEmailAndPassword(email.toLowerCase());
  const { hash, salt } = existedUser;
  if (!isEqualPassword(password, hash, salt)) {
    throw new Error(WRONG_EMAIL_PASSWORD);
  }

  return existedUser;
}

function isEqualPassword(password: string, hash: string, salt: string) {
  return hash === crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}